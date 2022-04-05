package nts.uk.ctx.bs.employee.dom.workplace.group;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.EmployeeAffiliation;

/*
 * DS_社員が所属する職場グループを取得する
 */
public class WorkplaceGroupGettingService {

	/**
	 * [1] 取得する
	 *
	 * @param require
	 * @param date
	 * @param employeeID
	 * @return
	 */
	public static List<EmployeeAffiliation> get(Require require, GeneralDate date, List<String> employeeIDs) {
		Map<String, String> empAffiliations = employeeIDs.stream()
				.collect(Collectors.toMap(x -> x, x -> require.getAffWkpHistItemByEmpDate(x, date)));
		List<String> wkpIDs = empAffiliations.values().stream().distinct()
				.collect(Collectors.toList());
		List<AffWorkplaceGroup> affWorkplaceGroups = require.getWGInfo(wkpIDs);
		return employeeIDs.stream().map(i -> {
			return WorkplaceGroupGettingService.create(i, empAffiliations, affWorkplaceGroups);
		}).collect(Collectors.toList());

	}

	/**
	 * [prv-1] 社員の所属組織を作成する
	 *
	 * @param employeeID
	 * @param workPlace
	 * @param affWorkplaceGroups
	 * @return
	 */
	private static EmployeeAffiliation create(String employeeID, Map<String, String> workPlace,
			List<AffWorkplaceGroup> affWorkplaceGroups) {
		String wkpIDs = workPlace.get(employeeID);
		Optional<AffWorkplaceGroup> affWorkplaceGroup = affWorkplaceGroups.stream()
				.filter(i -> i.getWorkplaceId().equals(wkpIDs)).findFirst();
		if (!affWorkplaceGroup.isPresent()) {
			return EmployeeAffiliation.createWithoutInfoAndWG(employeeID, wkpIDs);
		} else {
			return EmployeeAffiliation.createWithoutInfo(employeeID, wkpIDs, affWorkplaceGroup.get().getWorkplaceGroupId());
		}
	}

	public static interface Require {

		// [R-1] 社員が所属している職場を取得する
		String getAffWkpHistItemByEmpDate(String employeeID, GeneralDate date);

		// [R-2] 職場グループ所属情報を取得する
		List<AffWorkplaceGroup> getWGInfo(List<String> WKPID);
	}

}
