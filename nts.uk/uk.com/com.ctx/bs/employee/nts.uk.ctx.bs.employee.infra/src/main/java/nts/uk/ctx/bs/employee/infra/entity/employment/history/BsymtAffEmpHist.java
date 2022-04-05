/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.employment.history;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtAffEmpHist.
 */
@Entity
@AllArgsConstructor
@Table(name = "BSYMT_AFF_EMP_HIST")
public class BsymtAffEmpHist extends ContractUkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The historyid - PK. */
	@Id
	@Column(name = "HIST_ID")
	public String hisId;

	@Column(name = "CID")
	public String companyId;

	/** The employeeId. */
	@Basic(optional = false)
	@Column(name = "SID")
	public String sid;

	@Basic(optional = true)
	@Column(name = "START_DATE")
	public GeneralDate strDate;

	@Basic(optional = true)
	@Column(name = "END_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
	public GeneralDate endDate;

	/**
	 * Instantiates a new cempt employment.
	 */
	public BsymtAffEmpHist() {
		super();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.hisId;
	}

}
