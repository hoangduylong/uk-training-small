/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employment;

import java.util.Optional;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Class Employment.
 */
// 雇用
@Getter
public class Employment extends AggregateRoot {

	/** The company id. */
	// 会社ID.
	private CompanyId companyId;

	/** The employment code. */
	// 雇用コード.
	private EmploymentCode employmentCode;

	/** The employment name. */
	// 雇用名称.
	private EmploymentName employmentName;

	/** The emp external code. */
	// 雇用外部コード.
	private EmpExternalCode empExternalCode;

	/** The memo. */
	// メモ.
	private Memo memo;
	//グループ会社共通マスタID
	private Optional <String>  empCommonMasterId;
	// グループ会社共通マスタ項目ID
	private Optional <String>  empCommonMasterItemId;

	/**
	 * Instantiates a new employment.
	 *
	 * @param memento
	 *            the memento
	 */
	public Employment(EmploymentGetMemento memento) {
		this.companyId = memento.getCompanyId();
		this.employmentCode = memento.getEmploymentCode();
		this.employmentName = memento.getEmploymentName();
		this.empExternalCode = memento.getEmpExternalcode();
		this.memo = memento.getMemo();
		this.empCommonMasterId = memento.empCommonMasterId();
		this.empCommonMasterItemId = memento.empCommonMasterItemId();
	}

	/**
	 * Save to memento.
	 *
	 * @param memento
	 *            the memento
	 */
	public void saveToMemento(EmploymentSetMemento memento) {
		memento.setCompanyId(this.companyId);
		memento.setEmploymentCode(this.employmentCode);
		memento.setEmploymentName(this.employmentName);
		memento.setEmpExternalCode(this.empExternalCode);
		memento.setMemo(this.memo);
		memento.setEmpCommonMasterId(this.empCommonMasterId==null?null:this.empCommonMasterId.get());
		String empCommonMasterItemIdValue = null;
		if(this.empCommonMasterItemId.isPresent()){
			empCommonMasterItemIdValue = this.empCommonMasterItemId.get();
		}
		memento.setEmpCommonMasterItemId(empCommonMasterItemIdValue);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((companyId == null) ? 0 : companyId.hashCode());
		result = prime * result + ((employmentCode == null) ? 0 : employmentCode.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Employment other = (Employment) obj;
		if (companyId == null) {
			if (other.companyId != null)
				return false;
		} else if (!companyId.equals(other.companyId))
			return false;
		if (employmentCode == null) {
			if (other.employmentCode != null)
				return false;
		} else if (!employmentCode.equals(other.employmentCode))
			return false;
		return true;
	}

}
