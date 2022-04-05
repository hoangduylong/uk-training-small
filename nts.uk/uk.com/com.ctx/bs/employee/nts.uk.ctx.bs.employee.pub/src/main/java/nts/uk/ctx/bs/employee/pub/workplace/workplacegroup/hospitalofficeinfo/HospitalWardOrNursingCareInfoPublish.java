package nts.uk.ctx.bs.employee.pub.workplace.workplacegroup.hospitalofficeinfo;

import java.util.List;

import nts.arc.time.calendar.period.DatePeriod;

/**
 * 病棟・事業所情報Publish
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.Export.病棟・事業所情報Publish
 * @author kumiko_otake
 */
public interface HospitalWardOrNursingCareInfoPublish {

	/**
	 * 病棟情報を取得する
	 * @param workplaceGroupIds 職場グループIDリスト
	 * @param period 期間
	 * @return
	 */
	List<HospitalWardInfoExport> getHospitalWardInfo(List<String> workplaceGroupIds, DatePeriod period);

}
