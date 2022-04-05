/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ws.changepassword;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.error.BusinessException;
import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.gateway.app.command.changepassword.ChangePasswordCommand;
import nts.uk.ctx.sys.gateway.app.command.changepassword.ChangePasswordCommandHandler;
import nts.uk.ctx.sys.gateway.app.command.changepassword.ForgotPasswordCommand;
import nts.uk.ctx.sys.gateway.app.command.changepassword.ForgotPasswordCommandHandler;
import nts.uk.ctx.sys.gateway.app.command.loginold.dto.LoginInforDto;
import nts.uk.ctx.sys.gateway.app.find.securitypolicy.PasswordPolicyFinder;
import nts.uk.ctx.sys.gateway.app.find.securitypolicy.dto.PasswordPolicyDto;
import nts.uk.ctx.sys.gateway.app.service.login.LoginService;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserImport;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserImportNew;
import nts.uk.ctx.sys.gateway.dom.mail.UrlExecInfoRepository;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeImport;
import nts.uk.ctx.sys.shared.dom.employee.SysEmployeeAdapter;
import nts.uk.shr.com.url.UrlExecInfo;

/**
 * The Class ChangePasswordWebService.
 */
@Path("ctx/sys/gateway/changepassword")
@Produces("application/json")
@Stateless
public class ChangePasswordWebService extends WebService{
	
	/** The change pass command handler. */
	@Inject
	private ChangePasswordCommandHandler changePassCommandHandler;
	
	/** The forgot password command handler. */
	@Inject
	private ForgotPasswordCommandHandler forgotPasswordCommandHandler;
	
	/** The user adapter. */
	@Inject
	private UserAdapter userAdapter;
	
	/** The employee adapter. */
	@Inject
	private SysEmployeeAdapter employeeAdapter;
	
	@Inject
	private UrlExecInfoRepository urlExecInfoRepository;
	
	@Inject
	private LoginService service;
	
	@Inject
	private PasswordPolicyFinder passwordPolicyFinder;
	/**
	 * Channge pass word.
	 *
	 * @param command the command
	 */
	@POST
	@Path("submitchangepass")
	public void channgePassWord(ChangePasswordCommand command) {
		this.changePassCommandHandler.handle(command);
	}
	
	/**
	 * Submit forgot pass.
	 *
	 * @param command the command
	 */
	@POST
	@Path("submitforgotpass")
	public void submitForgotPass(ForgotPasswordCommand command) {
		this.forgotPasswordCommandHandler.handle(command);
	}
	
	/**
	 * Gets the user name by url.
	 *
	 * @param embeddedId the embedded id
	 * @return the user name by url
	 */
	@POST
	@Path("getUserNameByURL/{embeddedId}")
	public LoginInforDto getUserNameByUrl(@PathParam("embeddedId") String embeddedId) {
		//get URLExec
		Optional<UrlExecInfo> urlExec = this.urlExecInfoRepository.getUrlExecInfoByUrlID(embeddedId);
		
		if (urlExec.isPresent()){
			//get User
			Optional<UserImport> user = this.userAdapter.findUserByContractAndLoginId(urlExec.get().getContractCd(), urlExec.get().getLoginId());
			return new LoginInforDto(urlExec.get().getLoginId(),
					user.get().getUserName().get(),
					user.get().getUserId(),
					user.get().getContractCode());
		}
		return new LoginInforDto();
	}
	
	/**
	 * Gets the user name by login id.
	 *
	 * @param contractCode the contract code
	 * @param loginId the login id
	 * @return the user name by login id
	 */
	@POST
	@Path("getUserNameByLoginId/{contractCode}/{loginId}")
	public LoginInforDto getUserNameByLoginId(@PathParam("contractCode") String contractCode, @PathParam("loginId") String loginId) {
		Optional<UserImport> user = this.userAdapter.findUserByContractAndLoginId(contractCode, loginId);
		
		if (user.isPresent()){
			return new LoginInforDto(loginId, 
					user.get().getUserName().get(),
					user.get().getUserId(),
					user.get().getContractCode());
		}
		
		return new LoginInforDto();
	}
	
	/**
	 * getUserNameByLoginId.
	 *
	 * @param infor the infor
	 * @return the login infor dto
	 */
	@POST
	@Path("getUserNameByEmployeeCode")
	public LoginInforDto getUserNameByLoginId(EmployeeInforDto infor) {
		//set companyId
		String companyId = infor.getContractCode() + "-" + infor.getCompanyCode();
		// Edit employee code
		String employeeCode = service.employeeCodeEdit(infor.getEmployeeCode(), companyId);
					
		// Get domain 社員
		EmployeeImport em = this.getEmployee(companyId, employeeCode);
		
		Optional<UserImportNew> user = userAdapter.findUserByAssociateId(em.getPersonalId());
		if (user.isPresent()){
			return new LoginInforDto(infor.getEmployeeCode(),
					user.get().getUserName().get(),
					user.get().getUserId(),
					user.get().getContractCode());
		}
		return new LoginInforDto();
	}
	
	@POST
	@Path("username/mobile")
	public LoginInforDto getUserName(EmployeeInforDto infor) {
		String companyId = service.comanyId(infor.getContractCode(), infor.getCompanyCode());
		// Edit employee code
		String employeeCode = service.employeeCodeEdit(infor.getEmployeeCode(), companyId);
					
		// Get domain 社員
		EmployeeImport em = this.getEmployee(companyId, employeeCode);
		
		return userAdapter.findUserByAssociateId(em.getPersonalId()).map(u -> new LoginInforDto(infor.getEmployeeCode(),
																								u.getUserName().get(),
																								u.getUserId(),
																								u.getContractCode()))
																.orElseGet(() -> new LoginInforDto());
	}
	
	@POST
	@Path("getPasswordPolicy/{contractCode}")
	public PasswordPolicyDto getPasswordPolicy(@PathParam("contractCode") String contractCode){
		return this.passwordPolicyFinder.getPasswordPolicy(contractCode);
	}
	
	
	/**
	 * Gets the employee.
	 *
	 * @param companyId the company id
	 * @param employeeCode the employee code
	 * @return the employee
	 */
	private EmployeeImport getEmployee(String companyId, String employeeCode) {
		Optional<EmployeeImport> em = employeeAdapter.getCurrentInfoByScd(companyId, employeeCode);
		if (em.isPresent()) {
			return em.get();
		} else {
			throw new BusinessException("Msg_301");
		}
	}
}
