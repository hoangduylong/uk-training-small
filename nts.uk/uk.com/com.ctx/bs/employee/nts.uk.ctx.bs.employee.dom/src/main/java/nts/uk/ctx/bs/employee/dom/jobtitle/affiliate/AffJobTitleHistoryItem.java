/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.affiliate;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * The Class AffJobTitleHistoryItem.
 */
// 所属職位履歴項目
@Getter
@Setter
public class AffJobTitleHistoryItem extends AggregateRoot {

	/** The history id. */
	// 履歴ID
	private String historyId;

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The job title id. */
	// 職位ID
	private String jobTitleId;

	/** The note. */
	// 備考
	private AffJobTitleHistoryItemNote note;

	/**
	 * Instantiates a new aff job title history item.
	 */
	public AffJobTitleHistoryItem() {
		super();
	}

	/**
	 * Instantiates a new aff job title history item.
	 *
	 * @param historyId
	 *            the history id
	 * @param employeeId
	 *            the employee id
	 * @param jobTitleId
	 *            the job title id
	 * @param note
	 *            the note
	 */
	public AffJobTitleHistoryItem(String historyId, String employeeId, String jobTitleId,
			AffJobTitleHistoryItemNote note) {
		super();
		this.historyId = historyId;
		this.employeeId = employeeId;
		this.jobTitleId = jobTitleId;
		this.note = note;
	}

	/**
	 * Creates the from java type.
	 *
	 * @param histId
	 *            the hist id
	 * @param employeeId
	 *            the employee id
	 * @param jobTitleId
	 *            the job title id
	 * @param note
	 *            the note
	 * @return the aff job title history item
	 */
	public static AffJobTitleHistoryItem createFromJavaType(String histId, String employeeId,
			String jobTitleId, String note) {
		return new AffJobTitleHistoryItem(histId, employeeId, jobTitleId,
				new AffJobTitleHistoryItemNote(note));
	}

}
