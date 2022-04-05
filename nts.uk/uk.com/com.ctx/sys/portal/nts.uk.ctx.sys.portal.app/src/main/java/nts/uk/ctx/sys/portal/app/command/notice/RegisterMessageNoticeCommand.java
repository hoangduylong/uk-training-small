package nts.uk.ctx.sys.portal.app.command.notice;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import nts.arc.time.GeneralDateTime;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.sys.portal.app.query.notice.MessageNoticeDto;
import nts.uk.ctx.sys.portal.dom.notice.DestinationClassification;
import nts.uk.ctx.sys.portal.dom.notice.MessageNotice;
import nts.uk.ctx.sys.portal.dom.notice.TargetInformation;

/**
 * Create message notice command
 * 
 * @author DungDV
 *
 */
@Getter
public class RegisterMessageNoticeCommand implements MessageNotice.MementoGetter {

	/** 作成者ID */
	private String creatorID;

	/** お知らせメッセージ */
	private MessageNoticeDto messageNotice;

	@Override
	public GeneralDateTime getInputDate() {
		return this.messageNotice.getInputDate();
	}

	@Override
	public GeneralDateTime getModifiedDate() {
		return this.messageNotice.getModifiedDate();
	}

	@Override
	public DatePeriod getDatePeriod() {
		return new DatePeriod(this.messageNotice.getStartDate(), this.messageNotice.getEndDate());
	}

	@Override
	public List<String> getEmployeeIdSeen() {
		if (this.messageNotice.getEmployeeIdSeen() == null) {
			return new ArrayList<String>();
		}
		return this.messageNotice.getEmployeeIdSeen();
	}

	@Override
	public String getNotificationMessage() {
		return this.messageNotice.getNotificationMessage();
	}

	@Override
	public TargetInformation getTargetInformation() {
		TargetInformation infor = new TargetInformation();
		if (this.messageNotice.getTargetInformation() != null) {
			infor.setDestination(
					DestinationClassification.valueOf(this.messageNotice.getTargetInformation().getDestination()));
			infor.setTargetSIDs(this.messageNotice.getTargetInformation().getTargetSIDs());
			infor.setTargetWpids(this.messageNotice.getTargetInformation().getTargetWpids());
		}
		return infor;
	}

	public void setCurrentDate() {
		this.messageNotice.setInputDate(GeneralDateTime.now());
		this.messageNotice.setModifiedDate(GeneralDateTime.now());
	}

}
