package nts.uk.ctx.sys.portal.dom.toppagealarm;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDateTime;

public class ToppageAlarmDataHelper {
	
	/*
	 * 解消済である = FALSE
	 */
	public static ToppageAlarmData mockUnResolveDomain() {
		return ToppageAlarmData.builder()
				.cid("cid")
				.alarmClassification(AlarmClassification.ALARM_LIST)
				.displaySId("displaySId")
				.displayAtr(DisplayAtr.PIC)
				.isResolved(false)
				.occurrenceDateTime(GeneralDateTime.now())
				.displayMessage(new DisplayMessage("test message"))
				.subSids(new ArrayList<>())
				.linkUrl(Optional.of(new LinkURL("http://google.com.vn")))
				.readDateTime(Optional.of(GeneralDateTime.now()))
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.notificationId(Optional.of(new NotificationId("notificationId")))
				.build();
	}
	
	/*
	 * 解消済である = TRUE
	 */
	public static ToppageAlarmData mockResolvedDomain() {
		return ToppageAlarmData.builder()
				.cid("cid")
				.alarmClassification(AlarmClassification.ALARM_LIST)
				.displaySId("displaySId")
				.displayAtr(DisplayAtr.PIC)
				.isResolved(true)
				.occurrenceDateTime(GeneralDateTime.now())
				.displayMessage(new DisplayMessage("test message"))
				.subSids(new ArrayList<>())
				.linkUrl(Optional.of(new LinkURL("http://google.com.vn")))
				.readDateTime(Optional.of(GeneralDateTime.now()))
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.notificationId(Optional.of(new NotificationId("notificationId")))
				.build();
	}

	/*
	 * 表示社員区分 = input.dispAtr
	 */
	public static ToppageAlarmData mockDomainWithDispAtr(DisplayAtr dispAtr) {
		return ToppageAlarmData.builder()
				.cid("cid")
				.alarmClassification(AlarmClassification.ALARM_LIST)
				.displaySId("displaySId")
				.displayAtr(dispAtr)
				.isResolved(false)
				.occurrenceDateTime(GeneralDateTime.now())
				.displayMessage(new DisplayMessage("test message"))
				.subSids(new ArrayList<>())
				.linkUrl(Optional.of(new LinkURL("http://google.com.vn")))
				.readDateTime(Optional.of(GeneralDateTime.now()))
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.notificationId(Optional.of(new NotificationId("notificationId")))
				.build();
	}
	
	public static ToppageAlarmData mockDomainWithSubSidsAndDispAtr(List<String> subSids, DisplayAtr dispAtr) {
		return ToppageAlarmData.builder()
				.cid("cid")
				.alarmClassification(AlarmClassification.ALARM_LIST)
				.displaySId("displaySId")
				.displayAtr(dispAtr)
				.isResolved(false)
				.occurrenceDateTime(GeneralDateTime.now())
				.displayMessage(new DisplayMessage("test message"))
				.subSids(new ArrayList<>(subSids))
				.linkUrl(Optional.of(new LinkURL("http://google.com.vn")))
				.readDateTime(Optional.of(GeneralDateTime.now()))
				.patternCode(Optional.of(new AlarmListPatternCode("patternCode")))
				.notificationId(Optional.of(new NotificationId("notificationId")))
				.build();
	}
}
