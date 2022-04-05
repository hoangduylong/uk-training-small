package nts.uk.ctx.sys.auth.app.command.grant.roleindividual;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.arc.time.GeneralDate;
import nts.gul.text.StringUtil;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.ctx.sys.auth.dom.role.RoleRepository;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.uk.ctx.sys.shared.dom.user.User;
import nts.uk.ctx.sys.shared.dom.user.UserRepository;

@Stateless
public class CreateSysRoleIndividualGrantCommandHandler extends CommandHandlerWithResult<CreateRoleIndividualGrantCommand, CreateRoleIndividualGrantCommandResult> {

	@Inject
	private RoleRepository roleRepository;

	@Inject
	private RoleIndividualGrantRepository roleIndividualGrantRepo;

	@Inject
	private UserRepository userRepo;

	private static final String COMPANY_ID_SYSADMIN = "000000000000-0000";

	@Override
	protected CreateRoleIndividualGrantCommandResult handle(CommandHandlerContext<CreateRoleIndividualGrantCommand> context) {
		CreateRoleIndividualGrantCommand command = context.getCommand();

		if (StringUtil.isNullOrEmpty(command.getUserID(), true)) {
			throw new BusinessException("Msg_218", "CAS012_24");
		}

		if (command.getRoleType() != RoleType.COMPANY_MANAGER.value)
			command.setCompanyID(COMPANY_ID_SYSADMIN);
		Optional<RoleIndividualGrant> roleIndividualGrant = roleIndividualGrantRepo.findByUserCompanyRoleType(command.getUserID(), command.getCompanyID(), command.getRoleType());
		if (roleIndividualGrant.isPresent()) {
			throw new BusinessException("Msg_3");
		}
		List<Role> sysAdminRole = roleRepository.findByType(command.companyID, command.getRoleType());
		if (sysAdminRole.isEmpty())
			throw new RuntimeException("No default role exist");

		// ドメインモデル「ロール個人別付与」を新規登録する | Register a domain model "Role individual
		// grant"
		RoleIndividualGrant domain = command.toDomain(sysAdminRole.get(0).getRoleId());
		roleIndividualGrantRepo.add(domain);
		if (command.isSetRoleAdminFlag() == true) {
			val isExistCompanyRole = roleIndividualGrantRepo.findByUserCompanyRoleType(command.getUserID(), command.getDecisionCompanyID(), RoleType.COMPANY_MANAGER.value);
			List<Role> companyManagerRole = roleRepository.findByType(command.getDecisionCompanyID(), RoleType.COMPANY_MANAGER.value);
			if (companyManagerRole.isEmpty())
				throw new RuntimeException("No default company manager role exist");
			if (!isExistCompanyRole.isPresent()) {
				RoleIndividualGrant roleIndiGrantSys = RoleIndividualGrant.createFromJavaType(command.getUserID(), companyManagerRole.get(0).getRoleId(), command.getDecisionCompanyID(), RoleType.COMPANY_MANAGER.value,
						command.getStartValidPeriod(), command.getEndValidPeriod());
				// ドメインモデル「ロール個人別付与」を新規登録する | Register a domain model "Role
				// individual grant"
				roleIndividualGrantRepo.add(roleIndiGrantSys);
			}
		}
		if (command.getRoleType() == RoleType.SYSTEM_MANAGER.value) {
			Optional<User> user = userRepo.getListUserByDefUser(command.getUserID(), 1, GeneralDate.max());
			if (user.isPresent()) {
				if (user.get().isDefaultUser() == true) {
					user.get().setExpirationDate(command.getStartValidPeriod());
 					userRepo.update(user.get());
				}
			}
		}
		return new CreateRoleIndividualGrantCommandResult(domain.getCompanyId(), domain.getUserId(), domain.getRoleType().value);
	}
}
