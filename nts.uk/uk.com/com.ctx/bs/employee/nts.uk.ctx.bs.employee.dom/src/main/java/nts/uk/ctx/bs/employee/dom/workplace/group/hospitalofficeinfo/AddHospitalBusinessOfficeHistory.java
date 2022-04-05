package nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import lombok.val;
import nts.arc.task.tran.AtomTask;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.com.history.DateHistoryItem;
/**
 * 病棟・事業所情報履歴を追加する
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.病棟・事業所情報を追加する
 * @author lan_lt
 */
public class AddHospitalBusinessOfficeHistory {
	/**
	 * 追加する				
	 * @param require
	 * @param workplaceGroupId 職場グルーブID
	 * @param datePeriod 期間
	 * @param nighShiftRule 夜勤運用ルール
	 * @param nursingCareEstInfo 介護事業所情報
	 * @return
	 */
	public static AtomTask addHospitalBusinessOfficeHistory(Require require, String workplaceGroupId
			, DatePeriod datePeriod
			, NightShiftOperationRule nighShiftRule
			, Optional<NursingCareEstablishmentInfo> nursingCareEstInfo) {
		
		DateHistoryItem newDateHistItem = DateHistoryItem.createNewHistory(datePeriod);
		HospitalBusinessOfficeInfo newHospitalInfo = new HospitalBusinessOfficeInfo(workplaceGroupId
				, newDateHistItem.identifier(), nighShiftRule, nursingCareEstInfo);
		Optional<HospitalBusinessOfficeInfoHistory> hospitalHist = require.getHospitalBusinessOfficeInfoHistory(workplaceGroupId);
		
		return AtomTask.of(() ->{
			if(hospitalHist.isPresent()) {
				hospitalHist.get().add(newDateHistItem);
				require.insertHospitalBusinessOfficeHistory(newHospitalInfo, hospitalHist.get());
				
			}else {
				val newHospitalHist = new HospitalBusinessOfficeInfoHistory(workplaceGroupId
						, new ArrayList<> (Arrays.asList(newDateHistItem)));
				require.insertHospitalBusinessOfficeHistory(newHospitalInfo, newHospitalHist);
			}
			
		});
		
	}
	
	public static interface Require{
		/**
		 * 病棟・事業所情報履歴を追加する
		 * @param hospitalInfo 病棟・事業所情報
		 * @param hospitalHist 病棟・事業所情報履歴
		 */
		void insertHospitalBusinessOfficeHistory(HospitalBusinessOfficeInfo hospitalInfo, HospitalBusinessOfficeInfoHistory hospitalHist);

		/**
		 * 病棟・事業所情報履歴を取得する(職場グルーブID)
		 * @param workplaceGroupId 職場グルーブID
		 * @return
		 */
		Optional<HospitalBusinessOfficeInfoHistory> getHospitalBusinessOfficeInfoHistory(String workplaceGroupId);
		
	}
}
