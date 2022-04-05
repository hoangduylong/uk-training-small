/**
 * 
 */
package nts.uk.ctx.bs.person.dom.person.info.widowhistory;

import java.util.List;

/**
 * @author danpv
 *
 */
public interface WidowHistoryRepository {
	
	WidowHistory get();
	/**
	 * add widow history ドメインモデル「寡夫寡婦履歴」を新規登録する
	 * @param widowHistory
	 */
	void addWidowHistory(WidowHistory widowHistory);
	/**
	 * update widow history ドメインモデル「寡夫寡婦履歴」を取得する
	 * @param widowHistory
	 */
	void updateWidowHistory(WidowHistory widowHistory);
	
	WidowHistory getWidowHistoryById(String widowHisId);
	
	 List<WidowHistory> getbyPid(String pid);
}
