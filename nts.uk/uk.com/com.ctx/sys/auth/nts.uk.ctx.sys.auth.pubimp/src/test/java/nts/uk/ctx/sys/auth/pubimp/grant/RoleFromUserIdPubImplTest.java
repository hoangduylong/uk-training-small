package nts.uk.ctx.sys.auth.pubimp.grant;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Mocked;
import mockit.integration.junit4.JMockit;
import mockit.internal.util.FieldReflection;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSet;
import nts.uk.ctx.sys.auth.dom.roleset.service.RoleSetService;
import nts.uk.ctx.sys.auth.pub.grant.RoleFromUserIdPub.RoleInfoExport;


@RunWith(JMockit.class)
public class RoleFromUserIdPubImplTest {

	private static class Dummy{
		final static String companyId = "companyId";
		final static String userId = "userId";
		final static String roleID = "roleID";
		final static int roleTypeValue = 3;
		final static RoleType roleType = RoleType.valueOf(3);
		final static GeneralDate date = GeneralDate.today();
	}
	
	@Test
	public void testIsInCharge(
			@Mocked RoleIndividualGrantRepository roleIndRepo,
			@Mocked RoleIndividualGrant roleIndividualGrant) {
		RoleFromUserIdPubImpl target = new RoleFromUserIdPubImpl();
		FieldReflection.setField(RoleFromUserIdPubImpl.class, target, "roleIndRepo", roleIndRepo);
		
		new Expectations() {{
			roleIndRepo.findByUserCompanyRoleTypeDate(Dummy.userId, Dummy.companyId, Dummy.roleTypeValue, Dummy.date);
			result = Optional.of(roleIndividualGrant);
			
			roleIndividualGrant.getRoleId();
			result = Dummy.roleID;
		}};
		
		Optional<RoleInfoExport> RoleInfo = target.getRoleInfoFromUserId(Dummy.userId, Dummy.roleTypeValue, Dummy.date, Dummy.companyId);
		assertThat(RoleInfo.get().isInCharge()).isEqualTo(true);
		assertThat(RoleInfo.get().getRoleId()).isEqualTo(Dummy.roleID);
	}
	
	@Test
	public void testIsGeneral(
			@Mocked RoleIndividualGrantRepository roleIndRepo,
			@Mocked RoleSetService roleSetService,
			@Mocked RoleSet roleSet) {
		
		RoleFromUserIdPubImpl target = new RoleFromUserIdPubImpl();
		FieldReflection.setField(RoleFromUserIdPubImpl.class, target, "roleIndRepo", roleIndRepo);
		FieldReflection.setField(RoleFromUserIdPubImpl.class, target, "roleSetService", roleSetService);
		
		new Expectations() {{
			roleIndRepo.findByUserCompanyRoleTypeDate(Dummy.userId, Dummy.companyId, Dummy.roleTypeValue, Dummy.date);
			result = Optional.empty();
			
			roleSetService.getRoleSetFromUserId(Dummy.userId, Dummy.date, Dummy.companyId);
			result = Optional.of(roleSet);
			
			roleSet.getRoleIDByRoleType(Dummy.roleType);
			result = Dummy.roleID;
		}};
		
		Optional<RoleInfoExport> RoleInfo = target.getRoleInfoFromUserId(Dummy.userId, Dummy.roleTypeValue, Dummy.date, Dummy.companyId);
		assertThat(RoleInfo.get().isInCharge()).isEqualTo(false);
		assertThat(RoleInfo.get().getRoleId()).isEqualTo(Dummy.roleID);
	}
	
	
	@Test
	public void testIsNull(
			@Mocked RoleIndividualGrantRepository roleIndRepo,
			@Mocked RoleSetService roleSetService) {
		RoleFromUserIdPubImpl target = new RoleFromUserIdPubImpl();
		FieldReflection.setField(RoleFromUserIdPubImpl.class, target, "roleIndRepo", roleIndRepo);
		FieldReflection.setField(RoleFromUserIdPubImpl.class, target, "roleSetService", roleSetService);

		new Expectations() {{
			roleIndRepo.findByUserCompanyRoleTypeDate(Dummy.userId, Dummy.companyId, Dummy.roleTypeValue, Dummy.date);
			result = Optional.empty();
			
			roleSetService.getRoleSetFromUserId(Dummy.userId, Dummy.date, Dummy.companyId);
			result = Optional.empty();
		}};
		
		Optional<RoleInfoExport> RoleInfo = target.getRoleInfoFromUserId(Dummy.userId, Dummy.roleTypeValue, Dummy.date, Dummy.companyId);
		assertThat(RoleInfo).isEmpty();
	}
}
