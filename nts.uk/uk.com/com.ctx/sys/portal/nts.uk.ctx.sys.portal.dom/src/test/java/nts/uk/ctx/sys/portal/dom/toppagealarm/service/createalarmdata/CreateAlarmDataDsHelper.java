package nts.uk.ctx.sys.portal.dom.toppagealarm.service.createalarmdata;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmListPatternCode;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayAtr;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayMessage;
import nts.uk.ctx.sys.portal.dom.toppagealarm.LinkURL;
import nts.uk.ctx.sys.portal.dom.toppagealarm.service.registeralarmdata.ToppageAlarmParam;

public class CreateAlarmDataDsHelper {
	
	public static final String CID = "cid";
	public static final List<String> SIDS = Stream.of("sids").collect(Collectors.toList());
	
	/**
	 * Mock List<トップアラームパラメータ>
	 */
	public static List<ToppageAlarmParam> mockToppageAlarmParams() {
		List<ToppageAlarmParam> returnList = new ArrayList<>();
		returnList.add(ToppageAlarmParam.builder()
		.alarmClassification(AlarmClassification.ALARM_LIST)
		.occurrenceDateTime(GeneralDateTime.now())
		.displaySId("displaySId")
		.displayEmpClassfication(DisplayAtr.PIC)
		.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
		.displayMessage(Optional.of(new DisplayMessage("test message")))
		.linkUrl(Optional.of(new LinkURL("http://google.com.vn")))
		.patternName(Optional.of("patternName"))
		.build());
		return returnList;
	}
	
	/**
	 * Mock Optional<削除の情報>
	 * アラーム分類 = 更新処理自動実行業務エラー
	 */
	public static Optional<DeleleteInfo> mockDeleleteInfoBusinessErr() {
		List<String> sids = new ArrayList<>();
		sids.add("sid");
		return Optional.of(DeleleteInfo.builder()
				.alarmClassification(AlarmClassification.AUTO_EXEC_BUSINESS_ERR)
				.sids(sids)
				.displayEmpClassfication(DisplayAtr.PIC)
				.alarmListParttenCode(Optional.of("alarmListParttenCode"))
				.build());
	}

	/**
	 * Mock Optional<削除の情報>
	 * アラーム分類 = 更新処理自動実行動作異常
	 */
	public static Optional<DeleleteInfo> mockDeleleteInfoOperationErr() {
		List<String> sids = new ArrayList<>();
		sids.add("sid");
		return Optional.of(DeleleteInfo.builder()
				.alarmClassification(AlarmClassification.AUTO_EXEC_OPERATION_ERR)
				.sids(sids)
				.displayEmpClassfication(DisplayAtr.PIC)
				.alarmListParttenCode(Optional.of("alarmListParttenCode"))
				.build());
	}
	
	
	/**
	 * Mock Optional<削除の情報>
	 * アラーム分類 = アラームリスト
	 */
	public static Optional<DeleleteInfo> mockDeleleteInfoAlarmList() {
		List<String> sids = new ArrayList<>();
		sids.add("sid");
		return Optional.of(DeleleteInfo.builder()
				.alarmClassification(AlarmClassification.ALARM_LIST)
				.sids(sids)
				.displayEmpClassfication(DisplayAtr.PIC)
				.alarmListParttenCode(Optional.of("alarmListParttenCode"))
				.build());
	}
	
}
