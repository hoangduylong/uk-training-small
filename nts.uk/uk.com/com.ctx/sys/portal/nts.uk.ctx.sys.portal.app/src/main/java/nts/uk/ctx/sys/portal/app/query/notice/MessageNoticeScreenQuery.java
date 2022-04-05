package nts.uk.ctx.sys.portal.app.query.notice;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.sys.portal.dom.notice.DestinationClassification;
import nts.uk.ctx.sys.portal.dom.notice.MessageNotice;
import nts.uk.ctx.sys.portal.dom.notice.MessageNoticeRepository;
import nts.uk.ctx.sys.portal.dom.notice.adapter.AnniversaryNoticeImport;
import nts.uk.ctx.sys.portal.dom.notice.adapter.EmployeeInfoImport;
import nts.uk.ctx.sys.portal.dom.notice.adapter.MessageNoticeAdapter;
import nts.uk.ctx.sys.portal.dom.notice.adapter.RoleImport;
import nts.uk.ctx.sys.portal.dom.notice.adapter.WorkplaceInfoImport;
import nts.uk.ctx.sys.portal.dom.notice.service.MessageNoticeService;
import nts.uk.ctx.sys.portal.dom.notice.service.MessageNoticeService.MessageNoticeRequire;
import nts.uk.ctx.sys.shared.dom.user.builtin.BuiltInUser;
import nts.uk.shr.com.context.AppContexts;

/**
 * ScreenQuery お知らせメッセージ
 * @author DungDV
 *
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class MessageNoticeScreenQuery {

	@Inject
	private MessageNoticeAdapter messageNoticeAdapter;

	@Inject
	private MessageNoticeRepository messageNoticeRepository;

	/**
	 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG003_お知らせ機能.A：お知らせ表示.メニュー別OCD.社員が宛先のお知らせの内容を取得する
	 * @param period 期間
	 * @return DestinationNotificationDto
	 */
	public DestinationNotificationDto getContentOfDestinationNotification(DatePeriod period) {
		List<MsgNoticesDto> msgNotices = new ArrayList<MsgNoticesDto>();
		List<AnniversaryNoticesDto> anniversaryNotices = new ArrayList<AnniversaryNoticesDto>();
		MessageNoticeRequireImpl require = new MessageNoticeRequireImpl(messageNoticeAdapter, messageNoticeRepository);
		String sid = AppContexts.user().employeeId();
		// 1. 期間で全て参照できるメッセージを取得する(require, 社員ID, 期間)
		List<MessageNotice> listMsg = MessageNoticeService.getAllMsgInPeriod(require, period, sid);
		
		// 2. Not　List<お知らせメッセージ＞　IS Empty
		if (!listMsg.isEmpty()) { // List<お知らせメッセージ＞　IS Empty
			List<String> sIds = new ArrayList<>();
			listMsg.stream().forEach(x -> {
				if (!sIds.contains(x.getCreatorID())) {
					sIds.add(x.getCreatorID());
				}
			});
			
			// 社員ID（List）から社員コードと表示名を取得
			List<EmployeeInfoImport> listEmp = messageNoticeAdapter.getByListSID(sIds);
			Map<String, String> listEmpMap = listEmp.isEmpty()
					? new HashMap<>()
					: listEmp.stream().collect(Collectors.toMap(EmployeeInfoImport::getSid, EmployeeInfoImport::getBussinessName));
			
			// ※Map<お知らせメッセージ、作成者>の作成者にビジネスネームをセットする（Listの並び順はそのままとする)
			msgNotices = listMsg.stream()
					.map(x -> MsgNoticesDto.builder()
							.message(MessageNoticeDto.toDto(x))
							.creator(listEmpMap.get(x.getCreatorID()))
							.flag(isNewMessage(sid, x.getEmployeeIdSeen()))
							.build())
					.collect(Collectors.toList());
		}
		// 3. 期間で記念日情報を取得する(int, 期間)
		Map<AnniversaryNoticeImport, Boolean> anniversaryMap = messageNoticeAdapter.setFlag(period);
		
		anniversaryMap.forEach((key, value) -> {
			anniversaryNotices.add(AnniversaryNoticesDto.builder().anniversaryNotice(key).flag(value).build());
		});
		
		return DestinationNotificationDto.builder().anniversaryNotices(anniversaryNotices).msgNotices(msgNotices).build();
	}
	
	/**
	 * Is new message
	 * @param sid
	 * @param employeeIdSeen
	 * @return boolean
	 */
	public Boolean isNewMessage(String sid, List<String> employeeIdSeen) {
		return !employeeIdSeen.contains(sid);
	}
	
	/**
	 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG003_お知らせ機能.A：お知らせ表示.メニュー別OCD.社員のお知らせの画面を表示する
	 * @param period 期間
	 * @return
	 */
	public EmployeeNotificationDto getEmployeeNotification(DatePeriod period) {
		
		if (BuiltInUser.EMPLOYEE_ID.equals(AppContexts.user().employeeId())) {
			return EmployeeNotificationDto.forBuiltInUser();
		}
		
		String roleId = AppContexts.user().roles().forAttendance();
		// 1. ログイン者就業のロールID
		Optional<RoleImport> role = messageNoticeAdapter.findByRoleId(roleId);
		
		// 2. Get 社員が宛先のお知らせの内容を取得する
		DestinationNotificationDto destinationNotice = getContentOfDestinationNotification(period);
		
		return EmployeeNotificationDto.builder()
				.anniversaryNotices(destinationNotice.getAnniversaryNotices())
				.msgNotices(destinationNotice.getMsgNotices())
				.role(role.orElse(null))
				.systemDate(GeneralDateTime.now())
				.build();
	}
	
	/**
	 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG003_お知らせ機能.B：お知らせ作成一覧.メニュー別OCD.社員が作成したお知らせの内容を取得する
	 * @param period 期間
	 * @return <List>お知らせメッセージ
	 */
	public List<MessageNoticeDto> getContentOfNotification(DatePeriod period) {
		String sid = AppContexts.user().employeeId();
		List<MessageNotice> listMsg = messageNoticeRepository.getMsgByPeriodAndSid(period, sid);
		if (listMsg.isEmpty()) {
			return new ArrayList<MessageNoticeDto>();
		}
		return listMsg.stream().map(msg -> MessageNoticeDto.toDto(msg)).collect(Collectors.toList());
	}
	
	/**
	 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG003_お知らせ機能.C：お知らせ登録.メニュー別OCD.お知らせ宛先の社員の名称を取得する
	 * @param listSID 社員一覧ID（リスト）
	 * @return ＜List＞対象社員（社員ID、社員コード、ビジネスネーム）
	 */
	public List<EmployeeInfoImport> acquireNameOfDestinationEmployee(List<String> listSID) {
		// 1. <call> 社員ID（List）から社員コードと表示名を取得
		List<EmployeeInfoImport> listEmp = messageNoticeAdapter.getByListSID(listSID);
		return listEmp.stream().sorted(Comparator.comparing(EmployeeInfoImport::getScd)).collect(Collectors.toList());
	}
	
	/**
	 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG003_お知らせ機能.C：お知らせ登録.メニュー別OCD.お知らせ宛先の職場の名称を取得する
	 * @param wkIds 職場ID(List)
	 * @return ＜List＞対象職場（職場ID、職場コード、職場表示名）
	 */
	public List<WorkplaceInfoImport> getNameOfDestinationWkp(List<String> wkIds) {
		String cid = AppContexts.user().companyId();
		// Call [No.560]職場IDから職場の情報をすべて取得する Pub
		return messageNoticeAdapter.getWorkplaceMapCodeBaseDateName(cid, wkIds);
	}
	
	/**
	 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG003_お知らせ機能.C：お知らせ登録.メニュー別OCD.社員が作成するお知らせ登録の画面を表示する
	 * @param creatorId 作成者ID
	 * @param refeRange 社員参照範囲
	 * @param msg お知らせメッセージ(Optional)
	 * @return
	 */
	public NotificationCreated notificationCreatedByEmp(String creatorId, Integer refeRange, MessageNoticeDto msg) {
		GeneralDate baseDate = GeneralDate.today();
		WorkplaceInfoImport wkpInfor = null;
		List<WorkplaceInfoImport> targetWkps = new ArrayList<>();
		List<EmployeeInfoImport> targetEmps = new ArrayList<>();
		// 1. [社員参照範囲＝部門・職場(配下含まない）]: call[RQ30]社員所属職場履歴を取得
		if (refeRange == EmployeeReferenceRange.DEPARTMENT_ONLY.value) {
			Optional<WorkplaceInfoImport> sWkpHistExport = messageNoticeAdapter.getWorkplaceInfo(creatorId, baseDate);
			wkpInfor = sWkpHistExport.orElse(null);
		}
		
		// 2. [お知らせメッセージ　Not　Null　AND　お知らせメッセージ.対象情報.宛先区分＝職場選択]:get*(ログイン会社ID、お知らせメッセージ.職場ID):職場ID、職場コード、職場名称
		if (msg != null && msg.getTargetInformation().getDestination() == DestinationClassification.WORKPLACE.value) {
			// Call [No.560]職場IDから職場の情報をすべて取得する Pub
			targetWkps = messageNoticeAdapter.getWorkplaceMapCodeBaseDateName(AppContexts.user().companyId(),
					msg.getTargetInformation().getTargetWpids());
		}
		// 3. [お知らせメッセージ　Not　Null　AND　お知らせメッセージ.対象情報.宛先区分＝社員選択]call()
		if (msg != null && msg.getTargetInformation().getDestination() == DestinationClassification.EMPLOYEE.value) {
			// 社員ID（List）から社員コードと表示名を取得
			List<EmployeeInfoImport> listEmp = messageNoticeAdapter.getByListSID(msg.getTargetInformation().getTargetSIDs());
			targetEmps = listEmp.stream().sorted(Comparator.comparing(EmployeeInfoImport::getScd)).collect(Collectors.toList());
		}
		
		return NotificationCreated.builder().workplaceInfo(wkpInfor)
				.targetEmps(targetEmps)
				.targetWkps(targetWkps)
				.build();
	}
	
	/**
	 * Checks if is new msg.
	 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG020_メニュー.A：メニュー.アルゴリズム.初期表示.システム.アルゴリズム「お知らせ機能新規確認」を実行する
	 * @return true, if is new msg
	 */
	public boolean isNewMsg() {
		
		String sid = AppContexts.user().employeeId();
		
		if (BuiltInUser.EMPLOYEE_ID.equals(sid)) {
			return false;
		}
		
		MessageNoticeRequireImpl require = new MessageNoticeRequireImpl(messageNoticeAdapter, messageNoticeRepository);
		
		// 新メッセージがあるか
		boolean isNewMsg = MessageNoticeService.isNewMsg(require, sid);
		// 新記念日があるか
		boolean isNewAnniversary = this.messageNoticeAdapter.isTodayHaveNewAnniversary();
		return isNewMsg || isNewAnniversary;
	}

	@AllArgsConstructor
	public class MessageNoticeRequireImpl implements MessageNoticeRequire {

		@Inject
		private MessageNoticeAdapter messageNoticeAdapter;

		@Inject
		private MessageNoticeRepository messageNoticeRepository;

		@Override
		public Optional<String> getWpId(String sid, GeneralDate baseDate) {
			return messageNoticeAdapter.getWpId(sid, baseDate);
		}

		@Override
		public List<MessageNotice> getNewMsgForDay(Optional<String> wpId) {
			String cid = AppContexts.user().companyId();
			return messageNoticeRepository.getNewMsgForDay(cid, wpId);
		}

		@Override
		public List<MessageNotice> getMsgRefByPeriod(DatePeriod period, Optional<String> wpId, String sid) {
			String cid = AppContexts.user().companyId();
			return messageNoticeRepository.getMsgRefByPeriod(cid, period, wpId, sid);
		}
	}
}
