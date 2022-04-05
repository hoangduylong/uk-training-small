package nts.uk.ctx.sys.portal.app.find.toppagealarm;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import nts.arc.time.GeneralDateTime;

/**
 * 表示するアラームデータ
 */
@Builder
@AllArgsConstructor
@Getter
public class AlarmDisplayDataDto {

	/**
	 * アラーム分類
	 */
	private Integer alarmClassification;
	
	/**
	 * トップページアラームデータ．発生日時
	 */
	private GeneralDateTime occurrenceDateTime;
	
	/**
	 * トップページアラームデータ．表示メッセージ
	 */
	private String displayMessage;
	
	/**
	 * 会社ID
	 */
	private String companyId;
	
	/**
	 * 表示社員
	 */
	private String sId;
	
	/**
	 * 表示社員区分
	 */
	private Integer displayAtr;
	
	//部下の社員ID
	private List<String> subSids; //#116503
	
	//パターンコード
	private String patternCode;
	
	/**
	 * リンクURL
	 */
	private String linkUrl;
	
	/**
	 * 既読日時
	 */
	private GeneralDateTime alreadyDatetime;
	
	//通知ID
	private String notificationId;
	
}
