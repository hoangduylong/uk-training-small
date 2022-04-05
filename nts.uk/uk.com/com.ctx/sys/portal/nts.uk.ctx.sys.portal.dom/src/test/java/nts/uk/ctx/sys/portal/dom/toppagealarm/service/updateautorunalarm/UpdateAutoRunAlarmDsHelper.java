package nts.uk.ctx.sys.portal.dom.toppagealarm.service.updateautorunalarm;

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
import nts.uk.ctx.sys.portal.dom.toppagealarm.NotificationId;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;

public class UpdateAutoRunAlarmDsHelper {

	public static final String CID = "cid";
	public static final AlarmClassification ALARM_CLS = AlarmClassification.ALARM_LIST;
	public static final List<String> SIDS = Stream.of("sid").collect(Collectors.toList());
	
	/**
	 * Mock [R-1]自動実行のアラームを取得する
	 */
	public static List<ToppageAlarmData> mockR1() {
		List<ToppageAlarmData> returnList = new ArrayList<>();
		returnList.add(ToppageAlarmData.builder()
		.cid("cid")
		.alarmClassification(AlarmClassification.ALARM_LIST)
		.displaySId("displaySId")
		.displayAtr(DisplayAtr.PIC)
		.isResolved(false)
		.occurrenceDateTime(GeneralDateTime.now())
		.displayMessage(new DisplayMessage("test message"))
		.linkUrl(Optional.of(new LinkURL("http://google.com.vn")))
		.readDateTime(Optional.of(GeneralDateTime.now()))
		.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
		.notificationId(Optional.of(new NotificationId("notificationId")))
		.build());
		return returnList;
	}
}
