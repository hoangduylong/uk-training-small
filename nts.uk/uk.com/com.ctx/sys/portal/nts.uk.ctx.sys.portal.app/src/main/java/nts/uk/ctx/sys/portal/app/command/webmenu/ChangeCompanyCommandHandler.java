package nts.uk.ctx.sys.portal.app.command.webmenu;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.sys.portal.app.find.roleset.RoleSetPortalFinder;
import nts.uk.ctx.sys.portal.dom.adapter.company.CompanyAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.company.CompanyDto;
import nts.uk.ctx.sys.portal.dom.adapter.employee.EmployeeAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.employee.ShortEmployeeDto;
import nts.uk.ctx.sys.portal.dom.adapter.role.RoleGrantAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.roleset.RoleSetDto;
import nts.uk.ctx.sys.portal.dom.adapter.user.UserAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.user.UserDto;
import nts.uk.ctx.sys.portal.dom.permissionmenu.RoleType;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager.RoleIdSetter;
import nts.uk.shr.com.operation.SystemOperationSettingAdapter;
import nts.uk.shr.com.operation.SystemSuspendOut;

@Stateless
public class ChangeCompanyCommandHandler extends CommandHandlerWithResult<ChangeCompanyCommand, String>{

	@Inject
	private LoginUserContextManager contextManager;
	
	@Inject
	private EmployeeAdapter employeeAdapter;
	
	@Inject
	private RoleGrantAdapter roleGrantAdapter;
	
	@Inject
	private CompanyAdapter companyAdapter;
	
	@Inject
	private UserAdapter userAdapter;
	
	@Inject
	private RoleSetPortalFinder roleSetFinder;
	
	@Inject
	private SystemOperationSettingAdapter sysOpSetAdapter;
	
	/**
	 * CCG020_メニュー.会社を切替える
	 */
	@Override
	protected String handle(CommandHandlerContext<ChangeCompanyCommand> context) {
		String msgResult = "";
		ChangeCompanyCommand command = context.getCommand();
		LoginUserContext userCtx = AppContexts.user();
		String companyCD = command.getCompanyId().substring(13, 17);
		SystemSuspendOut sys = sysOpSetAdapter.stopUseConfirm_loginBf(userCtx.contractCode(), companyCD, 0, AppContexts.programId(), command.getScreenID());
		if(sys.isError()){//TH error
			//TH display msg content
			throw new BusinessException(sys.getMsgContent());
		}
		msgResult = sys.getMsgID();//Msg_1475
		Optional<CompanyDto> companyOpt = companyAdapter.getCompany(command.getCompanyId());
		List<ShortEmployeeDto> employees = employeeAdapter.getEmployeesByPId(userCtx.personId());
		Optional<ShortEmployeeDto> emp = employees.stream()
				.filter(e -> e.getCompanyId().equals(command.getCompanyId())).findFirst();
		if (emp.isPresent()) {
			ShortEmployeeDto empDto = emp.get();
			contextManager.changeCompany(userCtx.userId(), userCtx.personId(), userCtx.contractCode(),
					empDto.getCompanyId(), companyOpt.map(c -> c.getCompanyCode()).orElse(null), 
					empDto.getEmployeeId(), empDto.getEmployeeCode(), true);
		} else {
			contextManager.changeCompany(userCtx.userId(), userCtx.personId(), userCtx.contractCode(), 
					command.getCompanyId(), companyOpt.map(c -> c.getCompanyCode()).orElse(null), null, null, false);
		}
		Optional<UserDto> userInfo = userAdapter.getUserInfo(userCtx.userId());
		userInfo.ifPresent(c -> command.setPersonName(c.getUserName()));
		
		RoleIdSetter roleSetter = contextManager.roleIdSetter();
		getRole(userCtx.userId(), command.getCompanyId(), RoleType.EMPLOYMENT).ifPresent(r -> roleSetter.forAttendance(r));
		getRole(userCtx.userId(), command.getCompanyId(), RoleType.SALARY).ifPresent(r -> roleSetter.forPayroll(r));
		getRole(userCtx.userId(), command.getCompanyId(), RoleType.HUMAN_RESOURCE).ifPresent(r -> roleSetter.forPersonnel(r));
		getRole(userCtx.userId(), command.getCompanyId(), RoleType.OFFICE_HELPER).ifPresent(r -> roleSetter.forOfficeHelper(r));
//		getRole(userCtx.userId(), command.getCompanyId(), RoleType.MY_NUMBER).ifPresent(r -> roleSetter.for);
//		getRole(userCtx.userId(), command.getCompanyId(), RoleType.GROUP_COMAPNY_MANAGER).ifPresent(r -> roleSetter.for);
		getRole(userCtx.userId(), command.getCompanyId(), RoleType.COMPANY_MANAGER).ifPresent(r -> roleSetter.forCompanyAdmin(r));
		getRole(userCtx.userId(), command.getCompanyId(), RoleType.SYSTEM_MANAGER).ifPresent(r -> roleSetter.forSystemAdmin(r));
		getRole(userCtx.userId(), command.getCompanyId(), RoleType.PERSONAL_INFO).ifPresent(r -> roleSetter.forPersonalInfo(r));
		return msgResult;
	}
	
	private Optional<String> getRole(String userId, String companyId, RoleType roleType) {
		Optional<String> roleId = roleGrantAdapter.getRoleId(userId, companyId, roleType.value);
		if (roleId.isPresent()) return roleId;
		Optional<String> roleSetCdOpt = roleSetFinder.getRoleSetCode(companyId, userId);
		if (roleSetCdOpt.isPresent()) {
			Optional<RoleSetDto> roleSetOpt = roleGrantAdapter.getRoleSet(companyId, roleSetCdOpt.get());
			if (roleSetOpt.isPresent()) {
				RoleSetDto roleSet = roleSetOpt.get();
				switch (roleType) {
					case EMPLOYMENT:
						return Optional.ofNullable(roleSet.getEmploymentRoleId());
					case SALARY:
						return Optional.ofNullable(roleSet.getSalaryRoleId());
					case PERSONAL_INFO:
						return Optional.ofNullable(roleSet.getPersonInfRoleId());
					case OFFICE_HELPER:
						return Optional.ofNullable(roleSet.getOfficeHelperRoleId());
					case MY_NUMBER:
						return Optional.ofNullable(roleSet.getMyNumberRoleId());
					case HUMAN_RESOURCE:
						return Optional.ofNullable(roleSet.getHRRoleId());
					default:
						return Optional.empty();
				}
			}
		}
		return Optional.empty();
	}

}
