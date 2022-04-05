/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.command.loginold;

import java.util.Optional;
import java.util.UUID;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import org.apache.logging.log4j.util.Strings;

import nts.arc.error.BusinessException;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.gul.text.StringUtil;
import nts.uk.ctx.sys.gateway.app.command.login.password.CheckChangePassDto;
import nts.uk.ctx.sys.gateway.app.command.loginold.dto.LoginRecordInput;
import nts.uk.ctx.sys.gateway.app.command.loginold.dto.ParamLoginRecord;
import nts.uk.ctx.sys.gateway.app.command.systemsuspend.SystemSuspendOutput;
import nts.uk.ctx.sys.gateway.app.command.systemsuspend.SystemSuspendService;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserImportNew;
import nts.uk.ctx.sys.gateway.dom.loginold.LoginStatus;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.loginrecord.LoginRecordAdapter;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.loginrecord.LoginRecordInfor;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LoginMethod;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeImport;
import nts.uk.ctx.sys.shared.dom.employee.SysEmployeeAdapter;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.context.ScreenIdentifier;
import nts.uk.shr.com.context.loginuser.NullLoginUserContext;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;
import nts.uk.shr.com.i18n.TextResource;
import nts.uk.shr.com.security.audittrail.UserInfoAdaptorForLog;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.basic.LoginInformation;
import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;
import nts.uk.shr.com.security.audittrail.correction.processor.LogBasicInformationWriter;

/**
 * The Class LoginRecordRegistService.
 */
@Stateless
public class LoginRecordRegistService {

	/** The user repository. */
	@Inject
	private UserAdapter userAdapter;
	
	/** The user info adaptor for log. */
	@Inject
	private UserInfoAdaptorForLog userInfoAdaptorForLog;

	/** The log basic infor. */
	@Inject
	private LogBasicInformationWriter logBasicInfor;

	/** The login record adapter. */
	@Inject
	private LoginRecordAdapter loginRecordAdapter;

	/** The employee adapter. */
	@Inject
	private SysEmployeeAdapter employeeAdapter;
	
	@Inject
	private SystemSuspendService systemSuspendService;

	/**
	 * Call login record.
	 *
	 * @param param the param
	 */
	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public void callLoginRecord(ParamLoginRecord param) {
		// set input
		String programId = AppContexts.programId().substring(0, 6);
		String screenId = AppContexts.programId().substring(6);
		String url = AppContexts.requestedWebApi().getFullRequestPath();

		String queryParam = " ";

		if (url.indexOf("?") != -1) {
			queryParam = url.substring(url.indexOf("?"));
		}

		switch (LoginMethod.valueOf(param.loginMethod)) {
		case NORMAL_LOGIN:
			url = null;
			break;
		case SINGLE_SIGN_ON:
			break;
		default:
			break;
		}
		if (param.remark != null) {
			if (param.remark.length() > 100) {
				param.remark = param.remark.substring(0, 99);
			}
		}

		LoginRecordInput infor = new LoginRecordInput(programId, screenId, queryParam, param.loginStatus,
				param.loginMethod, url, param.remark, param.employeeId);

		// アルゴリズム「ログイン記録」を実行する１
		this.loginRecord(infor, param.companyId);
	}
	
	/**
	 * Gets the user.
	 *
	 * @param personalId the personal id
	 * @return the user
	 */
	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public UserImportNew getUser(String personalId, String companyId, String employeeCode) {
		Optional<UserImportNew> user = userAdapter.findUserByAssociateId(personalId);
		if (user.isPresent()) {
			return user.get();
		} else {
			String remarkText = companyId + " " + employeeCode + " " + TextResource.localize("Msg_301");
			ParamLoginRecord param = new ParamLoginRecord(companyId, LoginMethod.NORMAL_LOGIN.value,
					LoginStatus.Fail.value, remarkText, null);
			
			// アルゴリズム「ログイン記録」を実行する１
			this.callLoginRecord(param);
			throw new BusinessException("Msg_301");
		}
	}

	/**
	 * Gets the employee.
	 *
	 * @param companyId the company id
	 * @param employeeCode the employee code
	 * @return the employee
	 */
	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public EmployeeImport getEmployee(String companyId, String employeeCode) {
		Optional<EmployeeImport> em = employeeAdapter.getCurrentInfoByScd(companyId, employeeCode);
		if (em.isPresent()) {
			return em.get();
		} else {
			String remarkText = companyId + " " + employeeCode + " " + TextResource.localize("Msg_301");
			ParamLoginRecord param = new ParamLoginRecord(companyId, LoginMethod.NORMAL_LOGIN.value,
					LoginStatus.Fail.value, remarkText, null);
			
			// アルゴリズム「ログイン記録」を実行する１
			this.callLoginRecord(param);
			throw new BusinessException("Msg_301");
		}
	}

	public CheckChangePassDto writeLogForCheckPassError(EmployeeImport em, String msgErrorId) {
		String remarkText = em.getCompanyId() + " " + em.getEmployeeCode() + " " + TextResource.localize(msgErrorId);
		ParamLoginRecord param = new ParamLoginRecord(em.getCompanyId(), LoginMethod.NORMAL_LOGIN.value,
				LoginStatus.Fail.value, remarkText, em.getEmployeeId());
		
		// アルゴリズム「ログイン記録」を実行する１
		this.callLoginRecord(param);
		return new CheckChangePassDto(false, msgErrorId, false);
	}

	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public SystemSuspendOutput checkSystemStop(BasicLoginCommand command) {
		// アルゴリズム「システム利用停止の確認」を実行する
		String programID = AppContexts.programId().substring(0, 6);
		String screenID = AppContexts.programId().substring(6);
		SystemSuspendOutput systemSuspendOutput = systemSuspendService.confirmSystemSuspend(command.getContractCode(),  command.getCompanyCode(), 0, programID, screenID);
		if(systemSuspendOutput.isError()){
			throw new BusinessException(systemSuspendOutput.getMsgContent());
		}
		return systemSuspendOutput;
	}

	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public SystemSuspendOutput checkSystemStop(BasicLoginCommand command, LoginUserRoles loginUserRoles) {
		// アルゴリズム「システム利用停止の確認」を実行する
		String programID = AppContexts.programId().substring(0, 6);
		String screenID = AppContexts.programId().substring(6);
		SystemSuspendOutput systemSuspendOutput = systemSuspendService.confirmSystemSuspend(command.getContractCode(),  command.getCompanyCode(), 0, programID, screenID, loginUserRoles);
		if(systemSuspendOutput.isError()){
			throw new BusinessException(systemSuspendOutput.getMsgContent());
		}
		return systemSuspendOutput;
	}

	/**
	 * Check limit time.
	 *
	 * @param user the user
	 */
	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public void checkLimitTime(UserImportNew user, String companyId, String employeeCode) {
		if (user.getExpirationDate().before(GeneralDate.today())) {
			String remarkText = companyId + " " + employeeCode + " " + TextResource.localize("Msg_316");
			ParamLoginRecord param = new ParamLoginRecord(companyId, LoginMethod.NORMAL_LOGIN.value,
					LoginStatus.Fail.value, remarkText, null);
			
			// アルゴリズム「ログイン記録」を実行する１
			this.callLoginRecord(param);
			throw new BusinessException("Msg_316");
		}
	}

	/**
	 * Login record.
	 *
	 * @param infor
	 *            the infor
	 * @param companyId
	 *            the company id
	 */
	public void loginRecord(LoginRecordInput infor, String companyId) {
		// 基盤(KIBAN)よりログイン者の基本情報を取得する (Acquire the basic information of
		// the login from the from KIBAN)
		LoginInformation loginInformation = new LoginInformation(
				!AppContexts.requestedWebApi().getRequestIpAddress().isEmpty()
						? AppContexts.requestedWebApi().getRequestIpAddress() : null,
				!AppContexts.requestedWebApi().getRequestPcName().isEmpty()
						? AppContexts.requestedWebApi().getRequestPcName() : null,
				AppContexts.windowsAccount() != null ? AppContexts.windowsAccount().getUserName() : null);

		// 実行日時を取得する (Acquire execution date and time)
		GeneralDateTime dateTime = GeneralDateTime.now();

		// 実行時情報.ログインユーザコンテキスト.ユーザIDが存在する場合 (Execution information. Login user
		// context. If the user ID exists)
		LoginUserContext user = AppContexts.user();

		UserInfo userInfor = new UserInfo(" ", " ", " ");

		if (!(user instanceof NullLoginUserContext) && user.userId() != null) {
			if (user.isEmployee()){
				userInfor = this.userInfoAdaptorForLog.findByEmployeeIdAndCompanyId(user.employeeId(), user.companyId());
			} else {
				UserInfo u = this.userInfoAdaptorForLog.findByUserId(user.userId());
				userInfor = new UserInfo(u.getUserId(), user.employeeId(), u.getUserName());
			}
		} else {
			if (infor.employeeId != null) {
				userInfor = this.userInfoAdaptorForLog.findByEmployeeIdAndCompanyId(infor.employeeId, companyId);
			}
		}
		// set operationId
		String operationId = UUID.randomUUID().toString();

		// set targetProgram
		ScreenIdentifier targetProgram = new ScreenIdentifier(infor.programId, infor.screenId, infor.queryParam);

		// set authorityInformation
		LoginUserRoles authorityInformation = AppContexts.user().roles();

		// set LogBasicInformation
		if(Strings.isBlank(companyId)){
			companyId = AppContexts.user().companyId();
		}
		LogBasicInformation logBasicInfor = new LogBasicInformation(operationId, companyId, userInfor, loginInformation,
				dateTime, authorityInformation, targetProgram, infor.remark != null ? Optional.of(infor.remark) : Optional.empty());

		boolean lockStatus = false;

		// set loginRecord
		LoginRecordInfor loginRecord = new LoginRecordInfor(operationId, infor.loginMethod, infor.loginStatus,
				lockStatus, infor.url, infor.remark);

		// add domain LoginInformation and LoginRecord
		this.registLoginInfor(logBasicInfor, loginRecord);

	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.app.command.login.RegistLoginInfoInterface#registLoginInfor(nts.uk.shr.com.security.audittrail.basic.LogBasicInformation, nts.uk.ctx.sys.gateway.dom.login.adapter.loginrecord.LoginRecordInfor)
	 */
	public void registLoginInfor(LogBasicInformation logBasicInfor, LoginRecordInfor loginRecord) {
		// ドメインモデル「ログ基本情報」に追加する(Add to domain model "Log basic information")
		this.logBasicInfor.save(logBasicInfor);

		// ドメインモデル「ログイン記録」に追加する (Add to domain model 'login record')
		this.loginRecordAdapter.addLoginRecord(loginRecord);
	}


	/**
	 * Check input.
	 *
	 * @param command the command
	 */
	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public void checkInput(BasicLoginCommand command) {

		// check input company code
		if (StringUtil.isNullOrEmpty(command.getCompanyCode(), true)) {
			throw new BusinessException("Msg_318");
		}
		// check input employee code
		if (StringUtil.isNullOrEmpty(command.getEmployeeCode(), true)) {
			throw new BusinessException("Msg_312");
		}
//		// check input password
//		if (StringUtil.isNullOrEmpty(command.getPassword(), true)) {
//			throw new BusinessException("Msg_310");
//		}
	}
}
