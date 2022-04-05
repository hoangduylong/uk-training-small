package nts.uk.ctx.bs.employee.dom.workplace.group;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Injectable;
import mockit.integration.junit4.JMockit;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.EmployeeAffiliation;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupGettingService.Require;

@RunWith(JMockit.class)
public class WorkplaceGroupGettingServiceTest {

	@Injectable
	private Require require;
	/**
	 *  require.職場グループ所属情報を取得する( $職場IDリスト ) is empty
	 */
	@Test
	public void testGet() {
		GeneralDate date = GeneralDate.today();
		List<String> employeeIDs = Arrays.asList("emp1","emp2","emp3");
		String wkp = "wkp1";
		new Expectations() {
			{
				require.getAffWkpHistItemByEmpDate(anyString, date);
				result = wkp;

				require.getWGInfo(Arrays.asList(wkp));
			}
		};

		List<EmployeeAffiliation> datas = WorkplaceGroupGettingService.get(require, date, employeeIDs);
		assertThat(datas)
		.extracting(d->d.getEmployeeID(),d->d.getEmployeeCode(),d->d.getBusinessName(),d->d.getWorkplaceID(),d->d.getWorkplaceGroupID())
		.containsExactly(
				tuple(employeeIDs.get(0),Optional.empty(),Optional.empty(),wkp,Optional.empty()),
				tuple(employeeIDs.get(1),Optional.empty(),Optional.empty(),wkp,Optional.empty()),
				tuple(employeeIDs.get(2),Optional.empty(),Optional.empty(),wkp,Optional.empty())
				);
	}

	/**
	 *  require.職場グループ所属情報を取得する( $職場IDリスト ) is not empty
	 */
	@Test
	public void testGet_1() {
		GeneralDate date = GeneralDate.today();
		List<String> employeeIDs = Arrays.asList("emp1","emp2","emp3","emp4");
		String wkp1 = "wkp1";
		String wkp2 = "wkp2";
		String wkp3 = "wkp3";
		String wkp4 = "wkp4";
		String wkpGroup1 = "wKPGRPID1";
		String wkpGroup2 = "wKPGRPID2";
		List<AffWorkplaceGroup> listAffWorkplaceGroup = Arrays.asList(
				new AffWorkplaceGroup(wkpGroup1, wkp1) ,
				new AffWorkplaceGroup(wkpGroup2, wkp2),
				new AffWorkplaceGroup(wkpGroup1, wkp3)
				);

		new Expectations() {
			{
				require.getAffWkpHistItemByEmpDate("emp1", date);
				result = wkp1;

				require.getAffWkpHistItemByEmpDate("emp2", date);
				result = wkp2;

				require.getAffWkpHistItemByEmpDate("emp3", date);
				result = wkp3;

				require.getAffWkpHistItemByEmpDate("emp4", date);
				result = wkp4;

				require.getWGInfo(withAny(new ArrayList<>()));
				result = listAffWorkplaceGroup;
			}
		};


		List<EmployeeAffiliation> datas = WorkplaceGroupGettingService.get(require, date, employeeIDs);
		assertThat(datas)
		.extracting(d->d.getEmployeeID(),d->d.getEmployeeCode(),d->d.getBusinessName(),d->d.getWorkplaceID(),d->d.getWorkplaceGroupID())
		.containsExactly(
				tuple(employeeIDs.get(0),Optional.empty(),Optional.empty(),wkp1,Optional.of(wkpGroup1)),
				tuple(employeeIDs.get(1),Optional.empty(),Optional.empty(),wkp2,Optional.of(wkpGroup2)),
				tuple(employeeIDs.get(2),Optional.empty(),Optional.empty(),wkp3,Optional.of(wkpGroup1)),
				tuple(employeeIDs.get(3),Optional.empty(),Optional.empty(),wkp4,Optional.empty())
				);
	}

}
