package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.service.EmployeeReferenceRangeImport;
import nts.uk.ctx.bs.employee.dom.workplace.EmployeeAffiliation;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupGettingService;

/**
 * 社員が参照可能な職場グループと社員参照範囲を取得する
 * UKDesign.ドメインモデル."NittsuSystem.UniversalK".基幹.社員.職場.職場グループ
 *
 * @author HieuLt
 *
 */
public class GetWorkplaceGroupsAndEmpService {

	/**
	 * [1] 取得する
	 *
	 * @param require
	 * @param baseDate
	 * @param empId
	 * @return
	 */
	public static Map<String, ScopeReferWorkplaceGroup> getWorkplaceGroup(Require require, GeneralDate baseDate,
			String empId) {
		Map<String, ScopeReferWorkplaceGroup> ressult = new HashMap<>();
		if (require.whetherThePersonInCharge(empId)) {
			List<WorkplaceGroup> lstWorkplaceGroup = require.getAll();
			lstWorkplaceGroup.stream().forEach(c -> {
				ressult.put(c.getId(), ScopeReferWorkplaceGroup.ALL_EMPLOYEE);
			});
			return ressult;
		}
		// $参照可能職場グループ = [prv-1] 管理対象職場から取得する( require, 基準日, 社員ID )
		Map<String, ScopeReferWorkplaceGroup> data = getFromManagedWorkplace(require, baseDate, empId);
		// $所属組織 = 社員が所属する職場グループを取得する#取得する( require, 基準日, list: 社員ID ).first()
		EmployeeAffiliation employeeAffiliation = WorkplaceGroupGettingService
				.get(require, baseDate, Arrays.asList(empId)).get(0);
		if ((!employeeAffiliation.getWorkplaceGroupID().isPresent())
				|| (data.containsKey(employeeAffiliation.getWorkplaceGroupID().get()))) {
			/*
			 * if $所属組織.職場グループID.isEmpty() || $参照可能職場グループ.containsKey(
			 * $所属組織.職場グループID ) return $参照可能職場グループ
			 */
			return data;
		}
		// $社員参照範囲 = require.社員参照範囲を取得する( 社員ID )
		EmployeeReferenceRangeImport empRefeRange = require.getEmployeeReferRangeOfLoginEmployees(empId);
		/*
		 * $参照可能職場グループ .put Key $所属組織.職場グループID Value 職場グループ内の参照範囲#参照範囲を判定する(
		 * $社員参照範囲 )
		 */
		data.put(employeeAffiliation.getWorkplaceGroupID().get(),
				ScopeReferWorkplaceGroup.determineTheReferenceRange(empRefeRange));
		return data;

	}

	/**
	 * [prv-1] 管理対象職場から取得する
	 *
	 * @param require
	 * @param baseDate
	 * @param empId
	 * @return
	 */
	private static Map<String, ScopeReferWorkplaceGroup> getFromManagedWorkplace(Require require, GeneralDate baseDate,
			String empId) {
		Map<String, ScopeReferWorkplaceGroup> ressult = new HashMap<>();
		// $管理職場IDリスト = require.指定社員の管理職場をすべて取得する( 社員ID, 基準日 )
		List<String> listWorkplaceID = require.getAllManagedWorkplaces(empId, baseDate);
		/*
		 * if $管理職場IDリスト.isEmpty() return Map.empty
		 */
		if (listWorkplaceID.isEmpty()) {
			return new HashMap<>();
		}
		/*
		 * return require.指定職場の職場グループ所属情報を取得する( $管理職場IDリスト ): map $.職場グループID
		 * distinct map Key $.職場グループID Value 職場グループ内の参照範囲.全社員
		 */
		List<String> lstAffWorkplaceGroup = require.getByListWKPID(listWorkplaceID).stream().map(c -> c.getWorkplaceGroupId())
				.distinct().collect(Collectors.toList());
		lstAffWorkplaceGroup.stream().forEach(c -> {
			ressult.put(c, ScopeReferWorkplaceGroup.ALL_EMPLOYEE);
		});

		return ressult;
	}

	public static interface Require extends WorkplaceGroupGettingService.Require {
		/**
		 * [R-1] 職場グループをすべて取得する 職場グループRepository.getAll( 会社ID )
		 *
		 * @return
		 */
		List<WorkplaceGroup> getAll();

		/**
		 * [R-2] 指定職場の職場グループ所属情報を取得する 職場グループ所属情報Repository.*get( 会社ID,
		 * List<職場ID> )
		 *
		 * @param WKPID
		 * @return
		 */
		List<AffWorkplaceGroup> getByListWKPID(List<String> WKPID);

		/**
		 * [R-3] 担当者かどうか ※ログイン社員が担当者かどうか
		 */
		boolean whetherThePersonInCharge(String empId);

		/**
		 * [R-4] 社員参照範囲を取得する ※ログイン社員の社員参照範囲
		 *
		 */
		EmployeeReferenceRangeImport getEmployeeReferRangeOfLoginEmployees(String empId);

		/**
		 * [R-5] 指定社員の管理職場をすべて取得する アルゴリズム.指定社員の管理職場をすべて取得する( 社員ID, 年月日 )
		 * Output--- 職場ID
		 */
		List<String> getAllManagedWorkplaces(String empId, GeneralDate baseDate);
	}

}
