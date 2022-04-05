package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import static org.assertj.core.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.junit.Test;
import org.junit.runner.RunWith;

import lombok.val;
import mockit.Expectations;
import mockit.Injectable;
import mockit.Mocked;
import mockit.integration.junit4.JMockit;
import nts.arc.testing.assertion.NtsAssert;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.service.EmployeeReferenceRangeImport;
import nts.uk.ctx.bs.employee.dom.workplace.EmployeeAffiliation;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupCode;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupGettingService;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupName;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupType;

@RunWith(JMockit.class)
public class GetWorkplaceGroupsAndEmpServiceTest {

	@Injectable
	private GetWorkplaceGroupsAndEmpService.Require require;
	@Mocked
	private WorkplaceGroupGettingService wkpGrpGetService;

	/**
	 * Target	: [Private] 管理対象職場から取得する
	 * Pattern	: 管理職場 -> なし
	 * Output	: Map.empty
	 */
	@Test
	public void testGetFromManagedWorkplace_MngWkpIsEmpty() {

		// Mocking
		new Expectations() {{
			// require.指定社員の管理職場をすべて取得する( 社員ID, 基準日 )
			require.getAllManagedWorkplaces( (String)any, (GeneralDate)any );
		}};

		// Execute
		val instance = new GetWorkplaceGroupsAndEmpService();
		@SuppressWarnings("unchecked")
		val result = (Map<String, ScopeReferWorkplaceGroup>)NtsAssert.Invoke.privateMethod(instance
				, "getFromManagedWorkplace"
				, require, GeneralDate.today(), "empId"
			);

		// Assertion
		assertThat( result ).isEmpty();
	}

	/**
	 * Target	: [Private] 管理対象職場から取得する
	 * Pattern	: 管理職場 -> あり && 管理職場の所属職場グループ -> なし
	 * Output	: Map.empty
	 */
	@Test
	public void testGetFromManagedWorkplace_MngWkpIsNotEmpty_WkpgrpIsEmpty() {

		// 管理職場IDリスト
		val managedWorkplaces = Arrays.asList("WkpId#01", "WkpId#02");

		// Mocking
		new Expectations() {{
			// require.指定社員の管理職場をすべて取得する( 社員ID, 基準日 )
			require.getAllManagedWorkplaces( (String)any, (GeneralDate)any );
			result = managedWorkplaces;

			// require.指定職場の職場グループ所属情報を取得する( $管理職場IDリスト )
			require.getByListWKPID( managedWorkplaces );
		}};

		// Execute
		val instance = new GetWorkplaceGroupsAndEmpService();
		@SuppressWarnings("unchecked")
		val result = (Map<String, ScopeReferWorkplaceGroup>)NtsAssert.Invoke.privateMethod(instance
				, "getFromManagedWorkplace"
				, require, GeneralDate.today(), "empId"
			);

		// Assertion
		assertThat( result ).isEmpty();
	}

	/**
	 * Target	: [Private] 管理対象職場から取得する
	 * Pattern	:
	 * 		管理職場/管理職場の所属職場グループ
	 * 		・Wkp#11/WkpGrp#35
	 * 		・Wkp#23/WkpGrp#03
	 * 		・Wkp#04/WkpGrp#35
	 * 		・Wkp#05/(Empty)
	 * 		・Wkp#31/WkpGrp#12
	 * Output	:
	 * 		Keys -> WkpGrp#35, WkpGrp#03, WkpGrp#12
	 * 		Value is only ScopeReferWorkplaceGroup.ALL_EMPLOYEE
	 */
	@Test
	public void testGetFromManagedWorkplace_MngWkpIsNotEmpty_WkpgrpIsNotEmpty() {

		// 管理職場IDリスト
		val managedWorkplaces = Arrays.asList("WkpId#11", "WkpId#23", "WkpId#04", "WkpId#05", "WkpId#31");
		// 管理職場の所属職場グループリスト
		val affWkpGrps = Arrays.asList(
				new AffWorkplaceGroup("WkpGrp#35", "Wkp#11")
			,	new AffWorkplaceGroup("WkpGrp#03", "Wkp#23")
			,	new AffWorkplaceGroup("WkpGrp#35", "Wkp#04")
			,	new AffWorkplaceGroup("WkpGrp#12", "Wkp#31")
		);

		// Mocking
		new Expectations() {{
			// require.指定社員の管理職場をすべて取得する( 社員ID, 基準日 ) is Empty
			require.getAllManagedWorkplaces( (String)any, (GeneralDate)any );
			result = managedWorkplaces;

			// require.指定職場の職場グループ所属情報を取得する( $管理職場IDリスト )
			require.getByListWKPID( managedWorkplaces );
			result = affWkpGrps;
		}};

		// Execute
		val instance = new GetWorkplaceGroupsAndEmpService();
		@SuppressWarnings("unchecked")
		val result = (Map<String, ScopeReferWorkplaceGroup>)NtsAssert.Invoke.privateMethod(instance
				, "getFromManagedWorkplace"
				, require, GeneralDate.today(), "empId"
			);

		// Assertion
		assertThat( result.keySet() )
			.containsExactlyInAnyOrderElementsOf( affWkpGrps.stream().map(t->t.getWorkplaceGroupId()).distinct().collect(Collectors.toList()) );
		assertThat( result.values() ).containsOnly( ScopeReferWorkplaceGroup.ALL_EMPLOYEE );
	}


	/* ============================================================================================= */


	/**
	 * Target	: 取得する
	 * Pattern	: 担当者か -> yes && 職場グループ -> なし
	 * Output	: Map.empty
	 */
	@Test
	public void testGetWorkplaceGroup_PsnInCharge_WkpGrpIsEmpty() {

		// Mocking
		{
			// require.担当者かどうか( 社員ID )
			MockingHelper.isPersonInCharge(require, true);

			// require.職場グループをすべて取得する()
			new Expectations() {{
				require.getAll();
			}};
		}

		// Execute
		val result = GetWorkplaceGroupsAndEmpService.getWorkplaceGroup( require, GeneralDate.today(), "empId");

		// Assertion
		assertThat( result ).isEmpty();
	}

	/**
	 * Target	: 取得する
	 * Pattern	: 担当者か -> yes && 全ての職場グループ -> WkpGrp#47, WkpGrp#36, WkpGrp#19, WkpGrp#00
	 * Output	:
	 * 		Keys -> WkpGrp#47, WkpGrp#36, WkpGrp#19, WkpGrp#00
	 * 		Value is only ScopeReferWorkplaceGroup.ALL_EMPLOYEE
	 */
	@Test
	public void testGetWorkplaceGroup_PsnInCharge_WkpGrpIsNotEmpty() {

		// 全ての職場グループリスト
		val workplaceGroups = Arrays.asList(
				WorkplaceGroup.create("CID", new WorkplaceGroupCode("WGCD#47"), new WorkplaceGroupName("WGNAME#47"), WorkplaceGroupType.NORMAL)
			,	WorkplaceGroup.create("CID", new WorkplaceGroupCode("WGCD#36"), new WorkplaceGroupName("WGNAME#36"), WorkplaceGroupType.NORMAL)
			,	WorkplaceGroup.create("CID", new WorkplaceGroupCode("WGCD#19"), new WorkplaceGroupName("WGNAME#19"), WorkplaceGroupType.NORMAL)
			,	WorkplaceGroup.create("CID", new WorkplaceGroupCode("WGCD#00"), new WorkplaceGroupName("WGNAME#00"), WorkplaceGroupType.NORMAL)
		);

		// Mocking
		{
			// require.担当者かどうか( 社員ID )
			MockingHelper.isPersonInCharge(require, true);

			// require.職場グループをすべて取得する()
			new Expectations() {{
				require.getAll();
				result = workplaceGroups;
			}};
		}

		// Execute
		val result = GetWorkplaceGroupsAndEmpService.getWorkplaceGroup( require, GeneralDate.today(), "empId");

		// Assertion
		assertThat( result.keySet() )
			.containsOnlyElementsOf( workplaceGroups.stream().map(t->t.getId()).collect(Collectors.toList()) );
		assertThat( result.values() ).containsOnly( ScopeReferWorkplaceGroup.ALL_EMPLOYEE );
	}

	/* --------------------------------------------------------------------------------------------- */

	/**
	 * Target	: 取得する
	 * Pattern	: 担当者か -> no && 参照可能職場グループ -> なし && 所属組織の職場グループ -> なし
	 * Output	: Map.empty
	 */
	@Test
	public void testGetWorkplaceGroup_GeneralStaff_MngWkpGrpIsEmpty_AffWkpGrpIsEmpty() {

		// 所属組織情報(職場グループなし)
		val affInfoMySelf = EmployeeAffiliation.createWithoutInfoAndWG("empId", "WkpId");

		// Mocking
		{
			// require.担当者かどうか( 社員ID )
			MockingHelper.isPersonInCharge(require, false);

			// [private] 管理対象職場から取得する( require, 基準日, 社員ID )
			MockingHelper.getManagedWorkplaceGroup_ReturnEmptyList(require);

			// 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID )
			MockingHelper.getAffWorkplaceGroup(require, affInfoMySelf);
		}

		// Execute
		val result = GetWorkplaceGroupsAndEmpService.getWorkplaceGroup( require, GeneralDate.today(), affInfoMySelf.getEmployeeID());

		// Assertion
		assertThat( result ).isEmpty();
	}

	/**
	 * Target	: 取得する
	 * Pattern	:
	 * 		担当者か -> no && 参照可能職場グループ -> なし
	 * 		所属組織の職場グループ->あり && 社員参照範囲 -> 自分のみ
	 * Output	: Key/Value -> 所属組織の職場グループID/ScopeReferWorkplaceGroup.ALL_EMPLOYEE
	 */
	@Test
	public void testGetWorkplaceGroup_GeneralStaff_MngWkpGrpIsEmpty_AffWkpGrpIsNotEmpty_RefRangeIsOnlyMe() {

		// 所属組織情報(職場グループあり)
		val affInfoMySelf = EmployeeAffiliation.createWithoutInfo("empId", "WkpId", "WkpGrpId");

		// Mocking
		{
			// require.担当者かどうか( 社員ID )
			MockingHelper.isPersonInCharge(require, false);

			// [private] 管理対象職場から取得する( require, 基準日, 社員ID )
			MockingHelper.getManagedWorkplaceGroup_ReturnEmptyList(require);

			// 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID )
			MockingHelper.getAffWorkplaceGroup(require, affInfoMySelf);

			// require.社員参照範囲を取得する
			MockingHelper.getEmpRefRange(require, EmployeeReferenceRangeImport.ONLY_MYSELF);
		}

		// Execute
		val result = GetWorkplaceGroupsAndEmpService.getWorkplaceGroup( require, GeneralDate.today(), affInfoMySelf.getEmployeeID());

		// Assertion
		assertThat( result )
			.containsOnly(entry( affInfoMySelf.getWorkplaceGroupID().get(), ScopeReferWorkplaceGroup.ONLY_ME ));
	}

	/**
	 * Target	: 取得する
	 * Pattern	:
	 * 		担当者か -> no && 参照可能職場グループ -> なし
	 * 		所属組織の職場グループ->あり && 社員参照範囲 -> 自分のみ以外
	 * Output	: Key/Value -> 所属組織の職場グループID/ScopeReferWorkplaceGroup.ALL_EMPLOYEE
	 */
	@Test
	public void testGetWorkplaceGroup_GeneralStaff_MngWkpGrpIsEmpty_AffWkpGrpIsNotEmpty_RefRangeIsNotOnlyMe() {

		// 所属組織情報(職場グループあり)
		val affInfoMySelf = EmployeeAffiliation.createWithoutInfo("empId", "WkpId", "WkpGrpId");

		// Mocking
		{
			// require.担当者かどうか( 社員ID )
			MockingHelper.isPersonInCharge(require, false);

			// [private] 管理対象職場から取得する( require, 基準日, 社員ID )
			MockingHelper.getManagedWorkplaceGroup_ReturnEmptyList(require);

			// 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID )
			MockingHelper.getAffWorkplaceGroup(require, affInfoMySelf);

			// require.社員参照範囲を取得する
			MockingHelper.getEmpRefRange(require, EmployeeReferenceRangeImport.DEPARTMENT_AND_CHILD);
		}

		// Execute
		val result = GetWorkplaceGroupsAndEmpService.getWorkplaceGroup( require, GeneralDate.today(), affInfoMySelf.getEmployeeID());

		// Assertion
		assertThat( result )
			.containsOnly(entry( affInfoMySelf.getWorkplaceGroupID().get(), ScopeReferWorkplaceGroup.ALL_EMPLOYEE ));
	}

	/* --------------------------------------------------------------------------------------------- */

	/**
	 * Target	: 取得する
	 * Pattern	:
	 * 		担当者か -> no && 所属組織の職場グループ->なし
	 * 		管理職場の所属職場グループ -> WkpGrp#26, WkpGrp#08, WkpGrp#44, WkpGrp#07
	 * Output	:
	 * 		Keys -> WkpGrp#26, WkpGrp#08, WkpGrp#44, WkpGrp#07
	 * 		Value is only ScopeReferWorkplaceGroup.ALL_EMPLOYEE
	 */
	@Test
	public void testGetWorkplaceGroup_GeneralStaff_MngWkpGrpIsNotEmpty_AffWkpGrpIsEmpty() {

		// 所属組織情報(職場グループなし)
		val affInfoMySelf = EmployeeAffiliation.createWithoutInfoAndWG("empId", "WkpId");

		// 管理職場の所属職場グループ
		val affWkpGrpMngWkp = Arrays.asList("WkpGrp#26", "WkpGrp#08", "WkpGrp#44", "WkpGrp#07");

		// Mocking
		{
			// require.担当者かどうか( 社員ID )
			MockingHelper.isPersonInCharge(require, false);

			// [private] 管理対象職場から取得する( require, 基準日, 社員ID )
			MockingHelper.getManagedWorkplaceGroup_ReturnList(require, affWkpGrpMngWkp);

			// 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID )
			MockingHelper.getAffWorkplaceGroup(require, affInfoMySelf);
		}

		// Execute
		val result = GetWorkplaceGroupsAndEmpService.getWorkplaceGroup( require, GeneralDate.today(), affInfoMySelf.getEmployeeID());

		// Assertion
		assertThat( result ).containsOnlyKeys( affWkpGrpMngWkp );
		assertThat( result.values() ).containsOnly(ScopeReferWorkplaceGroup.ALL_EMPLOYEE);
	}

	/**
	 * Target	: 取得する
	 * Pattern	:
	 * 		担当者か -> no && 所属組織の職場グループ->WkpGrp#87
	 * 		管理職場の所属職場グループ -> WkpGrp#62, WkpGrp#87, WkpGrp#17, WkpGrp#71
	 * Output	:
	 * 		Keys -> WkpGrp#62, WkpGrp#87, WkpGrp#17, WkpGrp#71
	 * 		Value is only ScopeReferWorkplaceGroup.ALL_EMPLOYEE
	 */
	@Test
	public void testGetWorkplaceGroup_GeneralStaff_MngWkpGrpIsNotEmpty_AffWkpGrpIsManaged() {

		// 所属組織情報(職場グループあり)
		val affInfoMySelf = EmployeeAffiliation.createWithoutInfo("empId", "WkpId", "WkpGrp#87");

		// 管理職場の所属職場グループ
		val affWkpGrpMngWkp = Arrays.asList("WkpGrp#62", affInfoMySelf.getWorkplaceGroupID().get(), "WkpGrp#17", "WkpGrp#71");

		// Mocking
		{
			// require.担当者かどうか( 社員ID )
			MockingHelper.isPersonInCharge(require, false);

			// [private] 管理対象職場から取得する( require, 基準日, 社員ID )
			MockingHelper.getManagedWorkplaceGroup_ReturnList(require, affWkpGrpMngWkp);

			// 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID )
			MockingHelper.getAffWorkplaceGroup(require, affInfoMySelf);
		}

		// Execute
		val result = GetWorkplaceGroupsAndEmpService.getWorkplaceGroup( require, GeneralDate.today(), affInfoMySelf.getEmployeeID());

		// Assertion
		assertThat( result ).containsOnlyKeys( affWkpGrpMngWkp );
		assertThat( result.values() ).containsOnly(ScopeReferWorkplaceGroup.ALL_EMPLOYEE);
	}

	/**
	 * Target	: 取得する
	 * Pattern	:
	 * 		担当者か -> no && 所属組織の職場グループ->WkpGrp#75
	 * 		管理職場の所属職場グループ -> WkpGrp#46, WkpGrp#87, WkpGrp#52
	 * Output	:
	 * 		Keys -> WkpGrp#46, WkpGrp#87, WkpGrp#52, WkpGrp#75
	 * 		Values -> WkpGrp#75: ScopeReferWorkplaceGroup.ONLY_ME / else: ScopeReferWorkplaceGroup.ALL_EMPLOYEE
	 */
	@Test
	public void testGetWorkplaceGroup_GeneralStaff_MngWkpGrpIsNotEmpty_AffWkpGrpIsNotManaged() {

		// 所属組織情報(職場グループあり)
		val affInfoMySelf = EmployeeAffiliation.createWithoutInfo("empId", "WkpId", "WkpGrp#75");
		// 社員参照範囲
		val refRange = EmployeeReferenceRangeImport.ONLY_MYSELF;

		// 管理職場の所属職場グループ
		val affWkpGrpMngWkp = Arrays.asList("WkpGrp#46", "WkpGrp#87", "WkpGrp#52");

		// Mocking
		{
			// require.担当者かどうか( 社員ID )
			MockingHelper.isPersonInCharge(require, false);

			// [private] 管理対象職場から取得する( require, 基準日, 社員ID )
			MockingHelper.getManagedWorkplaceGroup_ReturnList(require, affWkpGrpMngWkp);

			// 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID )
			MockingHelper.getAffWorkplaceGroup(require, affInfoMySelf);

			// require.社員参照範囲を取得する
			MockingHelper.getEmpRefRange(require, refRange);
		}

		// Execute
		val result = GetWorkplaceGroupsAndEmpService.getWorkplaceGroup( require, GeneralDate.today(), affInfoMySelf.getEmployeeID());

		// Assertion
		assertThat( result ).hasSize( affWkpGrpMngWkp.size() + 1 );

		assertThat( result )
			.contains(entry( affInfoMySelf.getWorkplaceGroupID().get(), ScopeReferWorkplaceGroup.determineTheReferenceRange(refRange) ));

		assertThat( result.keySet() ).containsAll( affWkpGrpMngWkp );
		assertThat( result.entrySet() )
			.filteredOn(e -> affWkpGrpMngWkp.contains(e.getKey()))
			.extracting(e -> e.getValue())
			.containsOnly( ScopeReferWorkplaceGroup.ALL_EMPLOYEE );
	}


	/* ============================================================================================= */


	protected static class MockingHelper {

		/**
		 * Mock		: require.担当者かどうか( 社員ID )
		 * Result	: isPIC
		 */
		public static void isPersonInCharge(GetWorkplaceGroupsAndEmpService.Require require, boolean isPIC) {
			new Expectations() {{
				// require.担当者かどうか( 社員ID )
				require.whetherThePersonInCharge( (String)any );
				result = isPIC;
			}};
		}

		/**
		 * Mock		: [Private] 管理対象職場から取得する
		 * Result	: List.empty
		 */
		public static void getManagedWorkplaceGroup_ReturnEmptyList(GetWorkplaceGroupsAndEmpService.Require require) {
			// Mocking
			new Expectations() {{
				// require.指定社員の管理職場をすべて取得する( 社員ID, 基準日 )
				require.getAllManagedWorkplaces( (String)any, (GeneralDate)any );
			}};
		}

		/**
		 * Mock		: [Private] 管理対象職場から取得する
		 * Result	: Keys -> managedWkpGrp / Value is only ScopeReferWorkplaceGroup.ALL_EMPLOYEE
		 */
		@SuppressWarnings("unchecked")
		public static void getManagedWorkplaceGroup_ReturnList(GetWorkplaceGroupsAndEmpService.Require require, List<String> managedWkpGrps) {

			// 管理職場
			// ※捨てられるため内容は何でもOK
			val managedWorkplace = "WkpId";
			// 管理職場の所属職場グループ
			val affWkpInfos = managedWkpGrps.stream()
								.map(wkpGrpId -> new AffWorkplaceGroup(wkpGrpId, managedWorkplace))
								.collect(Collectors.toList());

			// Mocking
			new Expectations() {{
				// require.指定社員の管理職場をすべて取得する( 社員ID, 基準日 ) is Empty
				require.getAllManagedWorkplaces( (String)any, (GeneralDate)any );
				result = Arrays.asList(managedWorkplace);

				// require.指定職場の職場グループ所属情報を取得する( $管理職場IDリスト )
				require.getByListWKPID( (List<String>)any );
				result = affWkpInfos;
			}};
		}

		/**
		 * Mock		: 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID )
		 * Result	: list: affInfoMySelf
		 */
		@SuppressWarnings("unchecked")
		public static void getAffWorkplaceGroup(WorkplaceGroupGettingService.Require require, EmployeeAffiliation affInfoMySelf) {
			new Expectations() {{
				// 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID )
				WorkplaceGroupGettingService.get( require, (GeneralDate)any, (List<String>)any );
				result = Arrays.asList(affInfoMySelf);
			}};
		}

		/**
		 * Mock		: require.社員参照範囲を取得する
		 * Result	: range
		 */
		public static void getEmpRefRange(GetWorkplaceGroupsAndEmpService.Require require, EmployeeReferenceRangeImport range) {
			new Expectations() {{
				// require.社員参照範囲を取得する
				require.getEmployeeReferRangeOfLoginEmployees( (String)any );
				result = range;
			}};
		}
	}

}
