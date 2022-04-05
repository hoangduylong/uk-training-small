package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Injectable;
import mockit.integration.junit4.JMockit;
import nts.arc.enums.EnumAdaptor;
import nts.arc.testing.assertion.NtsAssert;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupCode;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupName;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupType;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplacement;
import nts.uk.ctx.bs.employee.dom.workplace.group.domainservice.AddWplOfWorkGrpService.Require;
/**
 * 
 * @author phongtq
 *
 */
@RunWith(JMockit.class)
public class AddWplOfWorkGrpServiceTest {
	
	@Injectable
	private Require require;
	
	@Test
	public void insert_return_alreadybelong() {
		String wKPID = "000000000000000000000000000000000011";// dummy
		String wKPGRPID = "00000000000001";
		new Expectations() {
			{
				require.getByWKPID(wKPID);// dummy
				AffWorkplaceGroup affWorkplaceGroup = new AffWorkplaceGroup(wKPGRPID, wKPID);
				result = Optional.of(affWorkplaceGroup);
			}
		};
		
		WorkplaceGroup DUMMY = new WorkplaceGroup(
				"000000000000000000000000000000000011", // dummy
				wKPGRPID, // 職場グループID
				new WorkplaceGroupCode("0000000001"),  // dummy
				new WorkplaceGroupName("00000000000000000011"),  // dummy
				EnumAdaptor.valueOf(1, WorkplaceGroupType.class)); // dummy
		
		WorkplaceReplaceResult workplaceReplaceResult = AddWplOfWorkGrpService.addWorkplace(require, DUMMY ,wKPID);
		assertThat(workplaceReplaceResult.getWorkplaceReplacement().equals(WorkplaceReplacement.ALREADY_BELONGED)).isTrue();
	}
	
	@Test
	public void insert_return_belonganother() {
		String wKPID = "000000000000000000000000000000000011"; // dummy
		// 職場グループID
		String wKPGRPID = "000000000000000000000000000000000011";
		new Expectations() {
			{
				require.getByWKPID(wKPID);// dummy
				AffWorkplaceGroup affWorkplaceGroup = new AffWorkplaceGroup(wKPGRPID, wKPID);
				result = Optional.of(affWorkplaceGroup);
			}
		};
		
		WorkplaceGroup DUMMY = new WorkplaceGroup(
				wKPID, // dummy
				"999999999999999999", // 職場グループID
				new WorkplaceGroupCode("0000000001"),  // dummy
				new WorkplaceGroupName("00000000000000000011"),  // dummy
				EnumAdaptor.valueOf(1, WorkplaceGroupType.class)); // dummy
		
		WorkplaceReplaceResult workplaceReplaceResult = AddWplOfWorkGrpService.addWorkplace(require, DUMMY, wKPID);
		assertThat(workplaceReplaceResult.getWorkplaceReplacement().equals(WorkplaceReplacement.BELONGED_ANOTHER)).isTrue();
	}
	
	@Test
	public void insert_success() {
		String wKPID = "000000000000000000000000000000000011";
		new Expectations() {
			{
				require.getByWKPID(wKPID);// dummy
			}
		};
		
		WorkplaceReplaceResult workplaceReplaceResult = AddWplOfWorkGrpService.addWorkplace(require, DomainServiceHelper.Helper.DUMMY,wKPID);
		
		NtsAssert.atomTask(
				() -> workplaceReplaceResult.getPersistenceProcess().get(),
				any -> require.insert((AffWorkplaceGroup) any.get())
		);
		
		assertThat(workplaceReplaceResult.getWorkplaceReplacement().equals(WorkplaceReplacement.ADD)).isTrue();
		
	}
	
}
