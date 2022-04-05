package nts.uk.ctx.sys.portal.dom.notice.adapter;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.Imported.社員IDから職場情報を取得する
 * @author DungDV
 *
 */
public interface MessageNoticeAdapter {
	
	/**
	 * 社員IDから職場IDを取得する
	 * @param sid 社員ID
	 * @param baseDate 基準日
	 * @return 職場ID
	 */
	public Optional<String> getWpId(String sid, GeneralDate baseDate);
	
	/**
	 * Find by emp ids.
	 * 社員ID（List）から社員コードと表示名を取得
	 * @param sIds the sids
	 * @return the list
	 */
	public List<EmployeeInfoImport> getByListSID(List<String> sIds);
	
	/**
	 * 期間で記念日情報を取得する
	 * @param datePeriod
	 * @return Map<AnniversaryNoticeImport, Boolean>
	 */
	public Map<AnniversaryNoticeImport, Boolean> setFlag(DatePeriod datePeriod);
	
	/**
	 * Find by role id.
	 *
	 * @param roleId the role id
	 * @return the optional
	 */
	public Optional<RoleImport> findByRoleId(String roleId);
	
	/**
	 * Get workplace information
	 * @param companyId 会社ID
	 * @param wpkIds 職場ID(List)
	 * @param baseDates
	 * @return
	 */
	public List<WorkplaceInfoImport> getWorkplaceMapCodeBaseDateName(String companyId, List<String> wpkIds);
	
	/**
	 * [RQ30]社員所属職場履歴を取得
	 * @param sid 社員ID
	 * @param baseDate 基準日
	 * @return
	 */
	public Optional<WorkplaceInfoImport> getWorkplaceInfo(String sid, GeneralDate baseDate);
	
	public boolean isTodayHaveNewAnniversary();
}
