/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.department;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtAffiDepartmentHist.
 * 所属部門履歴
 */
@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "BSYMT_AFF_DEP_HIST")
public class BsymtAffiDepartmentHist extends ContractUkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The historyid -  PK. */
	@Id
	@Column(name = "HIST_ID")
	private String hisId;

	/** The employeeId. */
	@Basic(optional = false)
	@Column(name = "SID")
	private String sid;
	
	/** The companyId. */
	@Basic(optional = false)
	@Column(name = "CID")
	private String cid;
	
	@Basic(optional = false)
	@Column(name = "START_DATE")
	private GeneralDate strDate;
	
	@Basic(optional = false)
	@Column(name = "END_DATE")
	private GeneralDate endDate;
	

	/**
	 * Instantiates a new cempt employment.
	 */
	public BsymtAffiDepartmentHist() {
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
