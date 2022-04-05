package nts.uk.ctx.sys.portal.dom.toppagealarm.service.registeralarmdata;

import java.util.Arrays;
import java.util.Optional;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmListPatternCode;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayAtr;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayMessage;
import nts.uk.ctx.sys.portal.dom.toppagealarm.LinkURL;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.shr.com.i18n.TextResource;

/*
 * トップページアラームデータを登録する
 * 
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページアラーム（ver4～）.DomainService.トップページアラームデータを登録する.トップページアラームデータを登録する
 */
public class RegisterAlarmDataDs {
	
	private RegisterAlarmDataDs() {}

	public static final String KTG031_37 = "KTG031_37";
	public static final String KTG031_38 = "KTG031_38";
	public static final String KTG031_39 = "KTG031_39";
	public static final String KTG031_40 = "KTG031_40";
	public static final String KAL001 = "KAL001";
	public static final String KBT002 = "KBT002";
	public static final String B = "B";
	public static final String F = "F";
	public static final Integer KINJIRO = 1; // 勤次郎
	public static final Integer STANDARD = 0; // 標準

	public static void register(RegisterAlarmDataRequire rq, String cid, ToppageAlarmParam param) {

		AlarmClassification alarmCls = param.getAlarmClassification();
		String displaySId = param.getDisplaySId();
		Optional<String> patternCode = param.getPatternCode().map(i -> i.v());
		Optional<String> patternName = param.getPatternName();
		DisplayAtr dispAtr = param.getDisplayEmpClassfication();
		GeneralDateTime occurrenceDateTime = param.getOccurrenceDateTime();

		Optional<ToppageAlarmData> checkDomain = rq.get(cid, displaySId, dispAtr.value, alarmCls.value, patternCode, Optional.empty());

		if (checkDomain.isPresent()) {
			// update
			ToppageAlarmData domain = checkDomain.get();
			if (!domain.getReadDateTime().isPresent() || domain.getReadDateTime().get().before(occurrenceDateTime)) {
				domain.changeSubSids(param.getSubSids(), param.getNoErrSids()); //#116503
				domain.updateOccurrenceDateTime(occurrenceDateTime);
				rq.update(domain);
			}
		} else {
			// insert
			Optional<String> dispMess = createMessage(cid, alarmCls, patternName, dispAtr, param.getDisplayMessage());
			Optional<String> linkUrl = createURL(rq, cid, alarmCls, param.getLinkUrl());
			ToppageAlarmData newDomain = ToppageAlarmData.builder().
					cid(cid)
					.alarmClassification(alarmCls)
					.displaySId(displaySId)
					.displayAtr(dispAtr)
					.occurrenceDateTime(occurrenceDateTime)
					.displayMessage(new DisplayMessage(dispMess.orElse("")))
					.isResolved(false)
					.subSids(param.getSubSids()) //#116503
					.linkUrl(Optional.ofNullable(new LinkURL(linkUrl.orElse(""))))
					.readDateTime(Optional.empty())
					.patternCode(Optional.ofNullable(new AlarmListPatternCode(patternCode.orElse(""))))
					.notificationId(Optional.empty()).build();

			rq.insert(newDomain);
		}
	}

	/*
	 * [prv-1] URLを作成する
	 */
	private static Optional<String> createURL(RegisterAlarmDataRequire rq, String cid, AlarmClassification alClass,
			Optional<LinkURL> linkUrl) {
		if (alClass == AlarmClassification.HEALTH_LIFE_MESSAGE) {
			return Optional.ofNullable(linkUrl.map(LinkURL::v).orElse(null));
		}
		if (alClass == AlarmClassification.ALARM_LIST) {
			return Optional.of("/nts.uk.at.web/view/kal/001/b/index.xhtml");
		}
		return rq.getUrl(cid, KINJIRO, STANDARD, KBT002, F);
	}

	/*
	 * [prv-2] メッセージを作成する
	 */
	private static Optional<String> createMessage(String cid, AlarmClassification alClass, Optional<String> patternName,
			DisplayAtr displayAtr, Optional<DisplayMessage> displayMessage) {
		if (alClass == AlarmClassification.HEALTH_LIFE_MESSAGE) {
			return Optional.ofNullable(displayMessage.map(DisplayMessage::v).orElse(null));
		}
		if (alClass == AlarmClassification.ALARM_LIST && displayAtr == DisplayAtr.PRINCIPAL) {
			return Optional
					.ofNullable(TextResource.localize(KTG031_37, Arrays.asList(patternName.map(i -> i).orElse(""))));
		}
		if (alClass == AlarmClassification.ALARM_LIST && displayAtr == DisplayAtr.SUPERIOR) {
			return Optional
					.ofNullable(TextResource.localize(KTG031_38, Arrays.asList(patternName.map(i -> i).orElse(""))));
		}
		if (alClass == AlarmClassification.AUTO_EXEC_BUSINESS_ERR) {
			return Optional.ofNullable(TextResource.localize(KTG031_39));
		}
		return Optional.ofNullable(TextResource.localize(KTG031_40));
	}

	public interface RegisterAlarmDataRequire {
		/**
		 * [R-1] 取得する
		 * 
		 * トップページアラームデータRepository. [8] get
		 * 
		 * @param 会社ID    companyId
		 * @param アラーム分類  alarmCls
		 * @param パターンコード patternCode
		 * @param 通知ID    notificationId
		 * @param 社員ID    sId
		 * @param 表示社員区分  dispAtr
		 * @return Optional＜トップページアラームデータ＞
		 */
		Optional<ToppageAlarmData> get(String cid, String sid, int dispAtr, int alarmCls, Optional<String> patternCode,
				Optional<String> notificationId);

		/**
		 * [R-2] トップページアラームデータをInsertする
		 * 
		 * トップページアラームデータRepository.[1]insert(トップページアラームデータ)
		 */
		void insert(ToppageAlarmData domain);

		/**
		 * [R-3] トップページアラームデータをUpdateする
		 * 
		 * トップページアラームデータRepository.[2]update(トップページアラームデータ)
		 */
		void update(ToppageAlarmData domain);

		/**
		 * [R-4] メニューのURLを取得する
		 * 
		 * 標準メニューRepository.取得する(会社ID、システム、メニュー分類、プログラムID、遷移先の画面ID)
		 * 
		 * @param cid
		 * @param system
		 * @param menuClassfication
		 * @param programId
		 * @param screenId
		 * @return
		 */
		Optional<String> getUrl(String cid, int system, int menuClassfication, String programId, String screenId);
	}
}
