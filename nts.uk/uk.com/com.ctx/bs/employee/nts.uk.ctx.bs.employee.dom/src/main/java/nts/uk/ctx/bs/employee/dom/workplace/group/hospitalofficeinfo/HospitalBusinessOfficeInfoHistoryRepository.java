package nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 病棟・事業所情報履歴Repository
 * @author lan_lt
 *
 */
public interface HospitalBusinessOfficeInfoHistoryRepository {

	/**
	 * get(職場グルーブID, 基準日)
	 * @param workplaceGroupId 職場グルーブID
	 * @param baseDate 基準日
	 * @return
	 */
	Optional<HospitalBusinessOfficeInfo> get(String workplaceGroupId, GeneralDate baseDate);

	/**
	 * 職場グループID指定して病棟・事業所情報履歴を取得する(職場グルーブID)
	 * @param workplaceGroupId 職場グルーブID
	 * @return
	 */
	Optional<HospitalBusinessOfficeInfoHistory> getHospitalBusinessOfficeInfoHistory(String workplaceGroupId);

	/**
	 * get(履歴ID)
	 * @param historyId 履歴ID
	 * @return
	 */
	Optional<HospitalBusinessOfficeInfo> get(String historyId);


	/**
	 * exists(職場グルーブID, 基準日)
	 * @param workplaceGroupId 職場グルーブID
	 * @param baseDate 基準日
	 * @return
	 */
	boolean exists(String workplaceGroupId, GeneralDate baseDate);


	/**
	 * insert(病棟・事業所情報, 病棟・事業所情報履歴)
	 * @param hospitalInfo 病棟・事業所情報
	 * @param hospitalHist 病棟・事業所情報履歴
	 */
	void insert(HospitalBusinessOfficeInfo hospitalInfo, HospitalBusinessOfficeInfoHistory hospitalHist);


	/**
	 * update(病棟・事業所情報履歴)
	 * @param hospitalHist 病棟・事業所情報履歴
	 */
	void updateHospitalInfoHistory(HospitalBusinessOfficeInfoHistory hospitalHist);

	/**
	 * update(病棟・事業所情報)
	 * @param hospitalBusinessOfficeInfo 病棟・事業所情報
	 */
	void updateHospitalBusinessOfficeInfo(HospitalBusinessOfficeInfo hospitalBusinessOfficeInfo);


	/**
	 * delete(職場グルーブID, 履歴ID)
	 * @param workplaceGroupId 職場グルーブID
	 * @param historyId 履歴ID
	 */
	void delete(String workplaceGroupId, String historyId);


	/**
	 * 期間付き履歴項目を取得する
	 * @param workplaceGroupId 職場グループID
	 * @param period 期間
	 * @return
	 */
	List<HospitalBusinessOfficeInfoWithPeriod> getItemWithDataForPeriod(String workplaceGroupId, DatePeriod period);

}
