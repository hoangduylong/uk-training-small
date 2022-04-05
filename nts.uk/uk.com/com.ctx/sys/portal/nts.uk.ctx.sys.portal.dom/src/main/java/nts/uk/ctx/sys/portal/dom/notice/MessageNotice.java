package nts.uk.ctx.sys.portal.dom.notice;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.お知らせメッセージ
 * 
 * @author DungDV
 *
 */
@Getter
public class MessageNotice extends AggregateRoot {

	/** 作成者ID */
	private String creatorID;

	/** 入力日 */
	private GeneralDateTime inputDate;

	/** 変更日 */
	private GeneralDateTime modifiedDate;

	/** 対象情報 */
	private TargetInformation targetInformation;

	/** 期間 */
	private DatePeriod datePeriod;

	/** 見た社員ID */
	private List<String> employeeIdSeen;

	/** メッセージの内容 */
	private NotificationMessage notificationMessage;

	public MessageNotice() {
	}

	/**
	 * [C-1] 初回お知らせメッセージデータを作成する
	 */
	public MessageNotice(String creatorID, GeneralDateTime modifiedDate, TargetInformation targetInformation,
			DatePeriod datePeriod) {
		this.creatorID = creatorID;
		this.modifiedDate = modifiedDate;
		this.targetInformation = targetInformation;
		this.datePeriod = datePeriod;
		this.inputDate = GeneralDateTime.now();
		this.employeeIdSeen = new ArrayList<>();
	}

	/**
	 * Create from memento
	 * 
	 * @param memento
	 * @return
	 */
	public static MessageNotice createFromMemento(MementoGetter memento) {
		MessageNotice domain = new MessageNotice();
		domain.getMemento(memento);
		return domain;
	}

	/**
	 * Get memento
	 * 
	 * @param memento
	 */
	public void getMemento(MementoGetter memento) {
		this.creatorID = memento.getCreatorID();
		this.inputDate = memento.getInputDate();
		this.modifiedDate = memento.getModifiedDate();
		this.datePeriod = memento.getDatePeriod();
		this.employeeIdSeen = memento.getEmployeeIdSeen();
		this.notificationMessage = new NotificationMessage(memento.getNotificationMessage());
		this.targetInformation = memento.getTargetInformation();
	}

	/**
	 * Set memento
	 * 
	 * @param memento
	 */
	public void setMemento(MementoSetter memento) {
		memento.setCreatorID(creatorID);
		memento.setInputDate(inputDate);
		memento.setModifiedDate(modifiedDate);
		if (datePeriod != null) {
			memento.setDatePeriod(datePeriod);
		}
		memento.setEmployeeIdSeen(employeeIdSeen);
		memento.setNotificationMessage(notificationMessage.v());
		if (targetInformation != null) {
			memento.setTargetInformation(targetInformation);
		}
	}

	/**
	 * MessageNotice MementoSetter
	 * 
	 * @author DungDV
	 *
	 */
	public static interface MementoSetter {
		void setCreatorID(String creatorID);

		void setInputDate(GeneralDateTime inputDate);

		void setModifiedDate(GeneralDateTime modifiedDate);

		void setDatePeriod(DatePeriod period);

		void setEmployeeIdSeen(List<String> employeeIdSeen);

		void setNotificationMessage(String notificationMessage);

		void setTargetInformation(TargetInformation target);
	}

	/**
	 * MessageNotice MementoGetter
	 * 
	 * @author DungDV
	 *
	 */
	public static interface MementoGetter {
		String getCreatorID();

		GeneralDateTime getInputDate();

		GeneralDateTime getModifiedDate();

		DatePeriod getDatePeriod();

		List<String> getEmployeeIdSeen();

		String getNotificationMessage();

		TargetInformation getTargetInformation();
	}

}
