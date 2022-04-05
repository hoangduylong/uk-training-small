/**
 * 
 */
package nts.uk.ctx.sys.auth.pubimp.employee;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;


import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.workplace.AffWorkplaceHistoryItemExport3;
import nts.uk.ctx.bs.employee.pub.workplace.master.WorkplacePub;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.uk.ctx.sys.auth.pub.employee.EmployeePublisher;
import nts.uk.ctx.sys.auth.pub.employee.WorkPlaceAuthorityDto;
import nts.uk.ctx.sys.auth.pub.grant.RoleFromUserIdPub;
import nts.uk.ctx.sys.auth.pub.user.UserInforEx;
import nts.uk.ctx.sys.auth.pub.user.UserPublisher;

/**
 * @author laitv 職場リスト、基準日から就業確定できるロールを持っている社員を取得する 
 * path :UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.権限管理.アルゴリズム.職場リスト、基準日から就業確定できるロールを持っている社員を取得する
 */

@Stateless
public class GetEmfromWkpidAndBDate {
	
	 @Inject
	 private WorkplacePub workplacePub;
	 @Inject
	 private UserPublisher userPublish;
	 @Inject
	 private RoleFromUserIdPub roleFromUserIdPub;

	/**
	 * 【INPUT】 require{ 所属職場権限を取得(会社ID、ロールID、機能NO) } 
	 * 会社ID 
	 * 基準日 
	 * List<職場ID>
	 * 
	 * 【OUTPUT】 Map＜職場ID、社員ID＞
	 */
	public Map<String, List<String>> getData(EmployeePublisher.RequireRQ653 requireRQ653, String companyID,
			GeneralDate referenceDate, List<String> workplaceIDs) {

		// 職場（List）と基準日から所属職場履歴項目を取得する
		List<AffWorkplaceHistoryItemExport3> affWorkplaceHisItems = workplacePub.getWorkHisItemfromWkpIdsAndBaseDate(workplaceIDs,  referenceDate);
		Map<String, List<AffWorkplaceHistoryItemExport3>> results = affWorkplaceHisItems.stream().collect(Collectors.groupingBy(AffWorkplaceHistoryItemExport3::getWorkplaceId));
		if(affWorkplaceHisItems.isEmpty())
			return new HashMap<>();
		
		// OUTPUT「Map＜職場ID、社員ID＞」を返す
		Map<String, List<String>> result = new HashMap<>();
		results.forEach((k,v) -> {
			List<String> empID = new ArrayList<>();
			for (AffWorkplaceHistoryItemExport3 item : v) {
				Optional<UserInforEx> userInfor = userPublish.getByEmpID(item.getEmployeeId());
				if (userInfor.isPresent()) {
					String roleId = roleFromUserIdPub.getRoleFromUserId(userInfor.get().getUserID(), RoleType.EMPLOYMENT.value, referenceDate, companyID);
					if (roleId != null && roleId != "") {
						Optional<WorkPlaceAuthorityDto> workPlaceAuthority = requireRQ653.getWorkAuthority(companyID, roleId, 2);
						if(workPlaceAuthority.isPresent()){
							if(workPlaceAuthority.get().isAvailability() == true){
									empID.add(item.getEmployeeId());
							}
						}
					}
				}
			}
			if(!empID.isEmpty())
			result.put(k, empID);
		});
		return result;
	}
}
