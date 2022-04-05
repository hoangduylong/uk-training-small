package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Injectable;
import mockit.Mock;
import mockit.MockUp;
import mockit.integration.junit4.JMockit;
import nts.arc.enums.EnumAdaptor;
import nts.arc.task.tran.AtomTask;
import nts.arc.testing.assertion.NtsAssert;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupCode;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupName;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupType;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplacement;
import nts.uk.ctx.bs.employee.dom.workplace.group.domainservice.ReplaceWorkplacesService.Require;

/**
 * 
 * @author phongtq
 *
 */

/*
 * WorkPlaceGroup: 00000000000001 
 * WorkPlaces:
 * 		000000000000000000000000000000000011 
 * 		000000000000000000000000000000000012
 * 
 * WorkPlaceGroup: 00000000000002 
 * WorkPlaces:
 * 		000000000000000000000000000000000013 
 * 		000000000000000000000000000000000014
 * 
 * Free WorkPlaces: 
 * 		000000000000000000000000000000000015
 * 		000000000000000000000000000000000016
 * ====================================================/
 * DomainService's Parameters: 
 * WorkPlaceGroup: 00000000000001 
 * WorkPlaces:
 * 		000000000000000000000000000000000012 
 * 		000000000000000000000000000000000014
 * 		000000000000000000000000000000000016
 * ====================================================
 * Results:
 * 000000000000000000000000000000000011 DELETE
 * 000000000000000000000000000000000012 ALREADY_BELONGED
 * 000000000000000000000000000000000014 BELONGED_ANOTHER
 * 000000000000000000000000000000000014 ADD
 */
@RunWith(JMockit.class)
public class ReplaceWorkplacesServiceTest {
	@Injectable
	private Require require;

	AtomTask atomTakss = AtomTask.of(() -> {
	});

	@Test
	public void testBelongAnother() {

		WorkplaceGroup workPlaceGroup = new WorkplaceGroup(
				"000000000000000000000000000000000016", 
				"00000000000001",
				new WorkplaceGroupCode("0000000001"),
				new WorkplaceGroupName("00000000000000000011"), 
				EnumAdaptor.valueOf(1, WorkplaceGroupType.class));

		List<AffWorkplaceGroup> affWorkplaceGroupList = Arrays.asList(
				new AffWorkplaceGroup("00000000000001", "000000000000000000000000000000000011"),
				new AffWorkplaceGroup("00000000000001", "000000000000000000000000000000000012"));
		
		// ------------------------- Mocking ↓
		new Expectations() {
			{
				require.getByWKPGRPID("00000000000001");
				result = affWorkplaceGroupList;
			}
		};
		
		new MockUp<AddWplOfWorkGrpService>() {
			@Mock
			public WorkplaceReplaceResult addWorkplace(AddWplOfWorkGrpService.Require require, WorkplaceGroup group, String lstWorkplaceId) {
				return WorkplaceReplaceResult.belongAnother("00000000000002");
			}
		};
		
		// ------------------------- DomainService
		List<String> newAffWorkplaceIdList = Arrays.asList("000000000000000000000000000000000012",
													"000000000000000000000000000000000014", 
													"000000000000000000000000000000000016");
		Map<String, WorkplaceReplaceResult> results = ReplaceWorkplacesService.replaceWorkplace(require, workPlaceGroup,
				newAffWorkplaceIdList);
		
		// ------------------------- Result Test
		assertThat(results.get("000000000000000000000000000000000014").getWorkplaceReplacement().name()
				.equals(WorkplaceReplacement.BELONGED_ANOTHER.name())).isTrue();
	}

	@Test
	public void testAdd() {

		WorkplaceGroup group = new WorkplaceGroup(
				"000000000000000000000000000000000016", 
				"00000000000001",
				new WorkplaceGroupCode("0000000001"), // dummy
				new WorkplaceGroupName("00000000000000000011"), // dummy
				EnumAdaptor.valueOf(1, WorkplaceGroupType.class));// dummy

		List<AffWorkplaceGroup> affWorkplaceGroupList = Arrays.asList(
				new AffWorkplaceGroup("00000000000001", "000000000000000000000000000000000011"),
				new AffWorkplaceGroup("00000000000001", "000000000000000000000000000000000012"));

		// ------------------------- Mocking ↓
		new Expectations() {
			{
				require.getByWKPGRPID("00000000000001");// dummy
				result = affWorkplaceGroupList;
			}
		};
		
		new MockUp<AddWplOfWorkGrpService>() {
			@Mock
			public WorkplaceReplaceResult addWorkplace(AddWplOfWorkGrpService.Require require, WorkplaceGroup group,
					String lstWorkplaceId) {
				return WorkplaceReplaceResult.add(atomTakss);
			}
		};
		
		// ------------------------- DomainService
		List<String> newAffWorkplaceIdList = Arrays.asList(
				"000000000000000000000000000000000012",
				"000000000000000000000000000000000014", 
				"000000000000000000000000000000000016");

		Map<String, WorkplaceReplaceResult> results = ReplaceWorkplacesService.replaceWorkplace(require, group,
				newAffWorkplaceIdList);
		
		// ------------------------- Result Test
		assertThat(results.get("000000000000000000000000000000000016").getWorkplaceReplacement().name()
				.equals(WorkplaceReplacement.ADD.name())).isTrue();
	}

	@Test
	public void testAlreadyBelong() {

		WorkplaceGroup group = new WorkplaceGroup("000000000000000000000000000000000016", "00000000000001",
				new WorkplaceGroupCode("0000000001"), // dummy
				new WorkplaceGroupName("00000000000000000011"), // dummy
				EnumAdaptor.valueOf(1, WorkplaceGroupType.class));// dummy

		List<AffWorkplaceGroup> affWorkplaceGroupList = Arrays.asList(
				new AffWorkplaceGroup("00000000000001", "000000000000000000000000000000000011"),
				new AffWorkplaceGroup("00000000000001", "000000000000000000000000000000000012"));

		// ------------------------- Mocking ↓
		new Expectations() {
			{
				require.getByWKPGRPID("00000000000001");// dummy
				result = affWorkplaceGroupList;
			}
		};
		
		new MockUp<AddWplOfWorkGrpService>() {
			@Mock
			public WorkplaceReplaceResult addWorkplace(AddWplOfWorkGrpService.Require require, WorkplaceGroup group,
					String lstWorkplaceId) {
				return WorkplaceReplaceResult.alreadyBelong("00000000000001");
			}
		};
		
		// ------------------------- DomainService
		List<String> newAffWorkplaceIdList = Arrays.asList("000000000000000000000000000000000012",
				"000000000000000000000000000000000014", "000000000000000000000000000000000016");

		Map<String, WorkplaceReplaceResult> results = ReplaceWorkplacesService.replaceWorkplace(require, group,
				newAffWorkplaceIdList);
		
		// ------------------------- Result Test
		assertThat(results.get("000000000000000000000000000000000012").getWorkplaceReplacement().name()
				.equals(WorkplaceReplacement.ALREADY_BELONGED.name())).isTrue();
	}

	@Test
	public void testDel() {
		WorkplaceGroup group = new WorkplaceGroup("000000000000000000000000000000000014", // dummy
				"00000000000001", // dummy
				new WorkplaceGroupCode("0000000001"), // dummy
				new WorkplaceGroupName("00000000000000000011"), // dummy
				EnumAdaptor.valueOf(1, WorkplaceGroupType.class));// dummy
		
		List<AffWorkplaceGroup> affWorkplaceGroupList = Arrays.asList(
				new AffWorkplaceGroup("00000000000001", "000000000000000000000000000000000012"),
				new AffWorkplaceGroup("00000000000001", "000000000000000000000000000000000011"));
		
		// ------------------------- Mocking ↓
		new Expectations() {
			{
				require.getByWKPGRPID("00000000000001");// dummy
				result = affWorkplaceGroupList;
			}
		};
		
		// ------------------------- DomainService
		List<String> newAffWorkplaceIdList = Arrays.asList("000000000000000000000000000000000012",
				"000000000000000000000000000000000016", "000000000000000000000000000000000014");
		Map<String, WorkplaceReplaceResult> workplacesService = ReplaceWorkplacesService.replaceWorkplace(require, group,
				newAffWorkplaceIdList);
		
		// ------------------------- Require Test Delete By WKPID
		NtsAssert.atomTask(
				() -> workplacesService.get("000000000000000000000000000000000011").getPersistenceProcess().get(),
				any -> require.deleteByWKPID(any.get()));

		// ------------------------- Result Test
		assertThat(workplacesService.get("000000000000000000000000000000000011").getWorkplaceReplacement().name()
				.equals(WorkplaceReplacement.DELETE.name())).isTrue();
	}

}
