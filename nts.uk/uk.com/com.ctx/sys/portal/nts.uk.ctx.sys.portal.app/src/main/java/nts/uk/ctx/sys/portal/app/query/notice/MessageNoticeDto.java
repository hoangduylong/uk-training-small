package nts.uk.ctx.sys.portal.app.query.notice;

import java.util.List;

import lombok.Data;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.sys.portal.dom.notice.MessageNotice;
import nts.uk.ctx.sys.portal.dom.notice.TargetInformation;
import nts.uk.ctx.sys.portal.dom.notice.adapter.TargetInformationDto;

/**
 * Dto お知らせメッセージ
 */
@Data
public class MessageNoticeDto implements MessageNotice.MementoSetter {

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

	public static MessageNoticeDto toDto(MessageNotice domain) {
		MessageNoticeDto dto = new MessageNoticeDto();
		domain.setMemento(dto);
		return dto;
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
		this.targetInformation = TargetInformationDto.builder().destination(target.getDestination().value)
				.targetSIDs(target.getTargetSIDs()).targetWpids(target.getTargetWpids()).build();
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
