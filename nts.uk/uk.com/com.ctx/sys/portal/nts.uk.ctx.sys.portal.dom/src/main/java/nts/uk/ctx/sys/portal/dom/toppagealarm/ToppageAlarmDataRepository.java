package nts.uk.ctx.sys.portal.dom.toppagealarm;

import java.util.List;
import java.util.Optional;

/**
 * トップページアラームデータRepository
 *
 */
public interface ToppageAlarmDataRepository {

	/**
	 * [1]  insert(トップページアラームデータ)
	 */
	void insert(ToppageAlarmData domain);
	
	/**
	 * [2]  update(トップページアラームデータ)
	 */
	void update(ToppageAlarmData domain);
	
	/**
	 * [3] get未読(会社ID,社員ID)
	 * @param companyId 会社ID
	 * @param sId 社員ID
	 * @return List＜トップページアラームデータ＞
	 */
	List<ToppageAlarmData> getUnread(String cid, String sId);
	
	/**
	 * [4] get未読と既読(会社ID,社員ID)
	 * @param companyId 会社ID
	 * @param sId 社員ID
	 * @return List＜トップページアラームデータ＞
	 */
	List<ToppageAlarmData> getAll(String cid, String sId);
	
	/**
	 * [5]  updateAll(List<トップページアラームデータ>)
	 */
	void updateAll(List<ToppageAlarmData> domains);
	
	/**
	 * [6] 自動実行のアラームを取得する
	 * 
	 * @param 会社ID cid
	 * @param アラーム分類 alarmCls
	 * @param 社員IDList sids
	 * @return List＜トップページアラームデータ＞
	 */
	List<ToppageAlarmData> getAutoRunAlarm(String cid, AlarmClassification alarmCls, List<String> sids);
	
	/**
	 * [7] アラームリストを取得する
	 * 
	 * @param 会社ID cid
	 * @param 社員IDList sids
	 * @param 表示社員区分 displayAtr
	 * @param パターンコード patternCode
	 * @return List＜トップページアラームデータ＞
	 */
	List<ToppageAlarmData> getAlarmList(String cid, List<String> sids, DisplayAtr displayAtr, AlarmListPatternCode patternCode);
	
	/**
	 * [8] get
	 * 
	 * @param 会社ID companyId
	 * @param アラーム分類 alarmCls
	 * @param パターンコード patternCode
	 * @param 通知ID notificationId
	 * @param 社員ID sId
	 * @param 表示社員区分 dispAtr
	 * @return Optional＜トップページアラームデータ＞
	 */
	Optional<ToppageAlarmData> get(String cid, String sid, int dispAtr, int alarmCls, Optional<String> patternCode, Optional<String> notificationId);
}
