/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.department;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtAffiDepartmentHistItem.
 *   所属部門履歴項目
 */
@Getter
@Setter
@Entity
@AllArgsConstructor
@Table(name = "BSYMT_AFF_DEP_HIST_ITEM")
public class BsymtAffiDepartmentHistItem extends ContractUkJpaEntity implements Serializable {

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
	
	/** The empCode. */
	@Basic(optional = false)
	@Column(name = "DEP_ID")
	private String depId;
	
	@Basic(optional = false)
	@Column(name = "AFF_HIST_TRANFS_TYPE")
	private String affHistTranfsType;
	
	@Basic(optional = false)
	@Column(name = "DISTR_RATIO")
	private BigDecimal distrRatio;

	/**
	 * Instantiates a new cempt employment.
	 */
	public BsymtAffiDepartmentHistItem() {
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
