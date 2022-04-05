package nts.uk.ctx.sys.portal.dom.notice;

import java.util.List;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.sys.portal.dom.notice.adapter.TargetInformationDto;

@Data
@Builder
public class MessageNoticeDto implements MessageNotice.MementoSetter, MessageNotice.MementoGetter {
	/** 作成者ID */
	private String creatorID;

	/** 入力日 */
	private GeneralDateTime inputDate;

	/** 変更日 */
	private GeneralDateTime modifiedDate;

	/** 対象情報 */
	private TargetInformationDto targetInformation;

	/** 期間 startDate */
	private GeneralDate startDate;

	/** 期間 startDate */
	private GeneralDate endDate;

	/** 見た社員ID */
	private List<String> employeeIdSeen;

	/** メッセージの内容 */
	private String notificationMessage;

	@Override
	public String getCreatorID() {
		return this.creatorID;
	}

	@Override
	public GeneralDateTime getInputDate() {
		return this.inputDate;
	}

	@Override
	public GeneralDateTime getModifiedDate() {
		return this.modifiedDate;
	}

	@Override
	public DatePeriod getDatePeriod() {
		if (this.startDate == null && this.endDate == null) {
			return null;
		}
		return new DatePeriod(this.startDate, this.endDate);
	}

	@Override
	public List<String> getEmployeeIdSeen() {
		return this.employeeIdSeen;
	}

	@Override
	public String getNotificationMessage() {
		return this.notificationMessage;
	}

	@Override
	public TargetInformation getTargetInformation() {
		if (this.targetInformation != null) {
			TargetInformation infor = new TargetInformation();
			infor.setDestination(
					DestinationClassification.valueOf(this.targetInformation.getDestination()));
			infor.setTargetSIDs(this.targetInformation.getTargetSIDs());
			infor.setTargetWpids(this.targetInformation.getTargetWpids());
			return infor;
		}
		return null;

	}

	@Override
	public void setDatePeriod(DatePeriod period) {
		if (period != null) {
			this.startDate = period.start();
			this.endDate = period.end();
		}
	}

	@Override
	public void setTargetInformation(TargetInformation target) {
		if (target != null) {
			this.targetInformation = TargetInformationDto.builder().destination(target.getDestination().value)
					.targetSIDs(target.getTargetSIDs()).targetWpids(target.getTargetWpids()).build();
		}
	}

	@Override
	public void setCreatorID(String creatorID) {
		this.creatorID = creatorID;
	}

	@Override
	public void setInputDate(GeneralDateTime inputDate) {
		this.inputDate = inputDate;
	}

	@Override
	public void setModifiedDate(GeneralDateTime modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	@Override
	public void setEmployeeIdSeen(List<String> employeeIdSeen) {
		this.employeeIdSeen = employeeIdSeen;
	}

	@Override
	public void setNotificationMessage(String notificationMessage) {
		this.notificationMessage = notificationMessage;
	}

}
