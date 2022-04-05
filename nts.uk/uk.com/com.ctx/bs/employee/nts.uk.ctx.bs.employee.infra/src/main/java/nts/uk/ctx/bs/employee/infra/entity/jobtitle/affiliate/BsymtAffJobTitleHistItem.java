/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.jobtitle.affiliate;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.PrimaryKeyJoinColumns;
import javax.persistence.Table;

import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtAffJobTitleHistItem.
 *   所属職位履歴項目
 */
@Entity
@Table(name = "BSYMT_AFF_JOB_HIST_ITEM")
public class BsymtAffJobTitleHistItem extends ContractUkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The historyid -  PK. */
	@Id
	@Column(name = "HIST_ID")
	public String hisId;

	/** The employeeId. */
	@Basic(optional = false)
	@Column(name = "SID")
	public String sid;
	
	/** The empCode. */
	@Basic(optional = false)
	@Column(name = "JOB_TITLE_ID")
	public String jobTitleId;
	
	@Basic(optional = false)
	@Column(name = "NOTE")
	public String note;
	
	/** The bsymt aff job title hist. */
	@OneToOne
	@PrimaryKeyJoinColumns({ @PrimaryKeyJoinColumn(name = "HIST_ID", referencedColumnName = "HIST_ID") })
	public BsymtAffJobTitleHist bsymtAffJobTitleHist;

	/**
	 * Instantiates a new cempt employment.
	 */
	public BsymtAffJobTitleHistItem() {
		super();
	}
	
	/**
	 * Instantiates a new bsymt aff job title hist item.
	 *
	 * @param hisId the his id
	 * @param sid the sid
	 * @param jobTitleId the job title id
	 * @param note the note
	 */
	public BsymtAffJobTitleHistItem(String hisId, String sid, String jobTitleId, String note) {
		super();
		this.hisId = hisId;
		this.sid = sid;
		this.jobTitleId = jobTitleId;
		this.note = note;
	}

	@Override
	protected Object getKey() {
		return this.hisId;
	}

}
