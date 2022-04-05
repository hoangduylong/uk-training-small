package nts.uk.ctx.sys.portal.dom.notice.service;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.sys.portal.dom.notice.MessageNotice;

/**
 * DomainService お知らせメッセージ
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.新メッセージがあるか
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.期間で参照できるメッセージを取得する
 * 
 * @author DungDV
 *
 */
public class MessageNoticeService {
	
	private MessageNoticeService() {}
	
	/**
	 * Checks if is new msg.
	 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.新メッセージがあるか
	 * 
	 * @param require the require
	 * @param sid     the sid
	 * @return the boolean
	 */
	public static Boolean isNewMsg(MessageNoticeRequire require, String sid) {
		GeneralDate baseDate = GeneralDate.today();
		// $職場ID = require.社員IDから職場IDを取得する(ログイン社員ID、年月日.今日)
		Optional<String> wpId = require.getWpId(sid, baseDate);
		// $List<お知らせメッセージ> ＝ require.参照できるメッセージを取得する($職場ID)
		List<MessageNotice> listMsg = require.getNewMsgForDay(wpId);
		// return !$List<お知らせメッセージ>.isEmpty()
		return !listMsg.isEmpty();
	}

	/**
	 * [1]期間で全て参照できるメッセージを取得する
	 * 
	 * @param require @Require
	 * @param period  期間
	 * @param sid     社員ID
	 * @return List<お知らせメッセージ>
	 */
	public static List<MessageNotice> getAllMsgInPeriod(MessageNoticeRequire require, DatePeriod period, String sid) {
		GeneralDate baseDate = GeneralDate.today();
		// $職場ID = require.社員IDから職場IDを取得する(ログイン社員ID、年月日.今日)
		Optional<String> wpId = require.getWpId(sid, baseDate);
		// return require.期間で参照できるメッセージを取得する(期間、$職場ID)
		return require.getMsgRefByPeriod(period, wpId, sid);
	}

	public static interface MessageNoticeRequire {

		/**
		 * [R-1] 社員IDから職場IDを取得する
		 * 
		 * @param sid      社員ID
		 * @param baseDate 基準日
		 * @return 職場ID
		 */
		Optional<String> getWpId(String sid, GeneralDate baseDate);

		/**
		 * [R-2] 参照できるメッセージを取得する
		 * 
		 * @param wpId 職場ID
		 * @return List<MessageNotice> List<お知らせメッセージ>
		 */
		List<MessageNotice> getNewMsgForDay(Optional<String> wpId);

		/**
		 * [R-2]期間で参照できるメッセージを取得する
		 * 
		 * @param period 期間
		 * @param wpId   職場ID
		 * @param sid    社員ID
		 * @return List<MessageNotice> List<お知らせメッセージ>
		 */
		List<MessageNotice> getMsgRefByPeriod(DatePeriod period, Optional<String> wpId, String sid);
	}
}
