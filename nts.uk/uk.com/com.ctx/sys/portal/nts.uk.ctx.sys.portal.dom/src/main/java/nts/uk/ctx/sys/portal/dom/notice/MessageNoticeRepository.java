package nts.uk.ctx.sys.portal.dom.notice;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDateTime;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * Repository お知らせメッセージ
 * @author DungDV
 *
 */
public interface MessageNoticeRepository {
	
	/**
	 * [1]  insert(お知らせメッセージ)
	 * @param msg
	 */
	void insert(MessageNotice msg);
	
	/**
	 * [2]  update(お知らせメッセージ)
	 * @param msg
	 */
	void update(MessageNotice msg);
	
	/**
	 * [３]  delete(お知らせメッセージ)
	 * @param msg
	 */
	void delete(MessageNotice msg);
	
	/**
	 * [4] 宛先区分で作成したメッセージを取得する
	 * @param period 期間
	 * @param destination 宛先区分
	 * @param sid 社員ID
	 * @return List<MessageNotice> List<お知らせメッセージ>
	 */
	List<MessageNotice> getMsgInDestinationCategory(DatePeriod period, DestinationClassification destination, String sid);
	
	/**
	 * [5]すべて作成したメッセージを取得する
	 * @param period 期間
	 * @param sid 社員ID
	 * @return List<MessageNotice> List<お知らせメッセージ>
	 */
	List<MessageNotice> getMsgByPeriodAndSid(DatePeriod period, String sid);
	
	/**
	 * [6] 職場IDListからメッセージを取得する
	 * @param period 期間
	 * @param wpIds 職場ID
	 * @param cid 会社ID
	 * @return List<MessageNotice> List<お知らせメッセージ>
	 */
	List<MessageNotice> getMsgFromWpIdList(DatePeriod period, List<String> wpIds, String cid);
	
	/**
	 * [7]期間で参照できるメッセージを取得する
	 * @param period 期間
	 * @param wpId 職場ID
	 * @param sid 社員ID
	 * @return List<MessageNotice> List<お知らせメッセージ>
	 */
	List<MessageNotice> getMsgRefByPeriod(String cid, DatePeriod period, Optional<String> wpId, String sid);
	
	/**
	 * [8]当日の新メッセージを取得する
	 * @param wpId 職場ID
	 * @return List<MessageNotice> List<お知らせメッセージ>
	 */
	List<MessageNotice> getNewMsgForDay(String cid, Optional<String> wpId);
	
	/**
	 * [9]期間、社員IDで参照できるメッセージを取得する
	 * @param period 期間
	 * @param sid 社員ID
	 * @return List<MessageNotice> List<お知らせメッセージ>
	 */
	List<MessageNotice> getMsgRefBySidForPeriod(DatePeriod period, String sid);
	
	/**
	 * [10]メッセージを見た情報をUpdateする
	 * @param msg お知らせメッセージ
	 * @param sid 社員ID
	 */
	void updateInforSawMessage(MessageNotice msg, String sid);
	
	/**
	 * Get message by creator id and input date
	 * @param creatorId 作成者ID
	 * @param inputDate 入力日
	 * @return お知らせメッセージList
	 */
	List<MessageNotice> getByCreatorIdAndInputDate(String creatorId, GeneralDateTime inputDate);
	
	List<MessageNotice> getMsgInDestinationCategoryAndCid(DatePeriod period, DestinationClassification destination,
			String cid);
}
