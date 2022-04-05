package nts.uk.ctx.sys.portal.dom.toppagealarm.service.registeralarmdata;

import java.util.ArrayList;
import java.util.Optional;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmListPatternCode;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayAtr;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayMessage;
import nts.uk.ctx.sys.portal.dom.toppagealarm.LinkURL;
import nts.uk.ctx.sys.portal.dom.toppagealarm.NotificationId;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;

public class RegisterAlarmDataDsHelper {

	public static final String CID = "cid";
	public static final String SID = "sid";
	public static final String PARTTERN_CD = "patternCode";
	public static final String URL = "url";
	public static final String KAL001 = "KAL001";
	public static final String KBT002 = "KBT002";
	public static final String B = "B";
	public static final String F = "F";
	public static final Integer KINJIRO = 1; // 勤次郎
	public static final Integer STANDARD = 0; // 標準
	public static final String KTG031_37 = "KTG031_37";
	public static final String KTG031_38 = "KTG031_38";
	public static final String KTG031_39 = "KTG031_39";
	public static final String KTG031_40 = "KTG031_40";
	
	/* 
	 * Mock [R-1] 取得する
	 * 
	 * 既読日時  EMPTY
	 */
	public static Optional<ToppageAlarmData>  mockToppageAlarmDataReadDateEmpty() {
		return Optional.of(ToppageAlarmData.builder()
		.cid("cid")
		.alarmClassification(AlarmClassification.ALARM_LIST)
		.displaySId("sid")
		.displayAtr(DisplayAtr.PIC)
		.isResolved(false)
		.subSids(new ArrayList<>())
		.occurrenceDateTime(GeneralDateTime.now())
		.displayMessage(new DisplayMessage("testMessage"))
		.linkUrl(Optional.of(new LinkURL("url")))
		.readDateTime(Optional.empty())
		.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
		.notificationId(Optional.of(new NotificationId("notificationId")))
		.build());
	}
	
	/*
	 * Mock [R-1] 取得する
	 * 
	 * 既読日時 NOT EMPTY
	 * 既読日時 AFTER 発生日時
	 */
	public static Optional<ToppageAlarmData>  mockToppageAlarmDataReadDateAfter() {
		return Optional.of(ToppageAlarmData.builder()
		.cid("cid")
		.alarmClassification(AlarmClassification.ALARM_LIST)
		.displaySId("sid")
		.displayAtr(DisplayAtr.PIC)
		.isResolved(false)
		.subSids(new ArrayList<>())
		.occurrenceDateTime(GeneralDateTime.now())
		.displayMessage(new DisplayMessage("testMessage"))
		.linkUrl(Optional.of(new LinkURL("url")))
		.readDateTime(Optional.of(GeneralDateTime.now().addHours(10)))
		.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
		.notificationId(Optional.of(new NotificationId("notificationId")))
		.build());
	}
	
	/*
	 * Mock [R-1] 取得する
	 * 
	 * 既読日時 NOT EMPTY
	 * 既読日時 BEFORE 発生日時
	 */
	public static Optional<ToppageAlarmData>  mockToppageAlarmDataReadDateBefore() {
		return Optional.of(ToppageAlarmData.builder()
		.cid("cid")
		.alarmClassification(AlarmClassification.ALARM_LIST)
		.displaySId("sid")
		.displayAtr(DisplayAtr.PIC)
		.isResolved(false)
		.subSids(new ArrayList<>())
		.occurrenceDateTime(GeneralDateTime.now())
		.displayMessage(new DisplayMessage("testMessage"))
		.linkUrl(Optional.of(new LinkURL("url")))
		.readDateTime(Optional.of(GeneralDateTime.now().addHours(-10)))
		.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
		.notificationId(Optional.of(new NotificationId("notificationId")))
		.build());
	}
	
	/*
	 * Mock トップページアラームデータを登録する Param
	 * 
	 * 発生日時 = NOW
	 * アラーム分類 = ヘルス×ライフメッセージ
	 */
	public static ToppageAlarmParam mockParamHealthLife() {
		return ToppageAlarmParam.builder()
				.alarmClassification(AlarmClassification.HEALTH_LIFE_MESSAGE)
				.occurrenceDateTime(GeneralDateTime.now())
				.displaySId("sid")
				.subSids(new ArrayList<>())
				.displayEmpClassfication(DisplayAtr.PIC)
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.displayMessage(Optional.of(new DisplayMessage("testMessage")))
				.linkUrl(Optional.of(new LinkURL("url")))
				.patternName(Optional.of("patternName"))
				.build();
	}
	
	/*
	 * Mock トップページアラームデータを登録する Param
	 * 
	 * 発生日時 = NOW
	 * アラーム分類 = アラームリスト
	 * 表示社員区分 = 本人
	 */
	public static ToppageAlarmParam mockParamAlarmListPrincipal() {
		return ToppageAlarmParam.builder()
				.alarmClassification(AlarmClassification.ALARM_LIST)
				.occurrenceDateTime(GeneralDateTime.now())
				.displaySId("sid")
				.subSids(new ArrayList<>())
				.displayEmpClassfication(DisplayAtr.PRINCIPAL)
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.displayMessage(Optional.of(new DisplayMessage("testMessage")))
				.linkUrl(Optional.of(new LinkURL("url")))
				.patternName(Optional.of("patternName"))
				.build();
	}
	
	/*
	 * Mock トップページアラームデータを登録する Param
	 * 
	 * 発生日時 = NOW
	 * アラーム分類 = アラームリスト
	 * 表示社員区分 = 上長
	 */
	public static ToppageAlarmParam mockParamAlarmListBoss() {
		return ToppageAlarmParam.builder()
				.alarmClassification(AlarmClassification.ALARM_LIST)
				.occurrenceDateTime(GeneralDateTime.now())
				.displaySId("sid")
				.subSids(new ArrayList<>())
				.displayEmpClassfication(DisplayAtr.SUPERIOR)
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.displayMessage(Optional.of(new DisplayMessage("testMessage")))
				.linkUrl(Optional.of(new LinkURL("url")))
				.patternName(Optional.of("patternName"))
				.build();
	}
	
	/*
	 * Mock トップページアラームデータを登録する Param
	 * 
	 * 発生日時 = NOW
	 * アラーム分類 = アラームリスト
	 * 表示社員区分 = 担当者
	 */
	public static ToppageAlarmParam mockParamAlarmListPic() {
		return ToppageAlarmParam.builder()
				.alarmClassification(AlarmClassification.ALARM_LIST)
				.occurrenceDateTime(GeneralDateTime.now())
				.displaySId("sid")
				.subSids(new ArrayList<>())
				.displayEmpClassfication(DisplayAtr.PIC)
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.displayMessage(Optional.of(new DisplayMessage("testMessage")))
				.linkUrl(Optional.of(new LinkURL("url")))
				.patternName(Optional.of("patternName"))
				.build();
	}
	
	/*
	 * Mock トップページアラームデータを登録する Param
	 * 
	 * 発生日時 = NOW
	 * アラーム分類 = 更新処理自動実行業務エラー 
	 */
	public static ToppageAlarmParam mockParamAlarmListBusinessErr() {
		return ToppageAlarmParam.builder()
				.alarmClassification(AlarmClassification.AUTO_EXEC_BUSINESS_ERR)
				.occurrenceDateTime(GeneralDateTime.now())
				.displaySId("sid")
				.subSids(new ArrayList<>())
				.displayEmpClassfication(DisplayAtr.PIC)
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.displayMessage(Optional.of(new DisplayMessage("testMessage")))
				.linkUrl(Optional.of(new LinkURL("url")))
				.patternName(Optional.of("patternName"))
				.build();
	}
}
