package nts.uk.ctx.sys.portal.app.find.toppagealarm;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmListPatternCode;
import nts.uk.ctx.sys.portal.dom.toppagealarm.LinkURL;
import nts.uk.ctx.sys.portal.dom.toppagealarm.NotificationId;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmDataRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ToppageAlarmDataFinder {
	
	@Inject
	private ToppageAlarmDataRepository toppageAlarmDataRepo;

	/**
	 * UKDesign.UniversalK.就業.KTG_ウィジェット.KTG031_トップページアラーム.トップページアラームver4.A:トップページアラーム.メニュー別OCD.アラームデータを表示する.アラームデータを表示する
	 * @param displayType
	 */
	public List<AlarmDisplayDataDto> findAlarmData(int displayType) {
		
		LoginUserContext currentUser = AppContexts.user();
		
		List<ToppageAlarmData> listAlarmData = new ArrayList<>();
		
		if (displayType == 0) { //表示モード＝未読のみ
			// 2: 表示モード＝未読のみ: get未読(ログイン会社ID、ログイン社員ID): トップページアラームデータ
			listAlarmData = this.toppageAlarmDataRepo.getUnread(currentUser.companyId(), currentUser.employeeId());
		} else { //表示モード＝全て表示
			// 3: 表示モード＝全て表示: get未読と既読(ログイン会社ID,ログイン社員ID): トップページアラームデータ
			listAlarmData = this.toppageAlarmDataRepo.getAll(currentUser.companyId(), currentUser.employeeId());
		}

		//4.
		return listAlarmData.stream()
				.map(item -> AlarmDisplayDataDto.builder()
							.alarmClassification(item.getAlarmClassification().value)
							.occurrenceDateTime(item.getOccurrenceDateTime())
							.displayMessage(item.getDisplayMessage().v())
							.companyId(item.getCid())
							.sId(item.getDisplaySId())
							.displayAtr(item.getDisplayAtr().value)
							.subSids(item.getSubSids())
							.patternCode(item.getPatternCode().map(AlarmListPatternCode::v).orElse(null))
							.linkUrl(item.getLinkUrl().map(LinkURL::v).orElse(null))
							.alreadyDatetime(item.getReadDateTime().map(i -> i).orElse(null))
							.notificationId(item.getNotificationId().map(NotificationId::v).orElse(null))
							.build())
				.collect(Collectors.toList());
	}
}
