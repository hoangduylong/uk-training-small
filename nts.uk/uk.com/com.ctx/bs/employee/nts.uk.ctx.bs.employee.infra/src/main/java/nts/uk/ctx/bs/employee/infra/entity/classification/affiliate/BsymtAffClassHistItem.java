/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.classification.affiliate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.PrimaryKeyJoinColumns;
import javax.persistence.Table;

import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtAffClassHistItem.
 */
@Entity
@Table(name = "BSYMT_AFF_CLASS_HIST_ITEM")
public class BsymtAffClassHistItem extends ContractUkJpaEntity {

	/** The history id. */
	@Id
	@Column(name = "HIST_ID")
	public String historyId;

	/** The sid. */
	@Column(name = "SID")
	public String sid;

	/** The classification code. */
	@Column(name = "CLASSIFICATION_CODE")
	public String classificationCode;
	
	/** The bsymt aff class history. */
	@OneToOne
	@PrimaryKeyJoinColumns({ @PrimaryKeyJoinColumn(name = "HIST_ID", referencedColumnName = "HIST_ID") })
	public BsymtAffClassHist bsymtAffClassHistory;
	
	/**
	 * Instantiates a new bsymt aff class hist item.
	 */
	public BsymtAffClassHistItem() {
		super();
	}
	
	/**
	 * Instantiates a new bsymt aff class hist item ver 1.
	 *
	 * @param historyId the history id
	 * @param sid the sid
	 * @param classificationCode the classification code
	 */
	public BsymtAffClassHistItem(String historyId, String sid, String classificationCode) {
		super();
		this.historyId = historyId;
		this.sid = sid;
		this.classificationCode = classificationCode;
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return historyId;
	}

}
