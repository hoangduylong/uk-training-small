/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.employment;

import java.util.Optional;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.employment.EmpExternalCode;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentCode;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentName;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento;
import nts.uk.ctx.bs.employee.infra.entity.employment.BsymtEmployment;
import nts.uk.ctx.bs.employee.infra.entity.employment.BsymtEmploymentPK;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Class JpaEmploymentSetMemento.
 */
public class JpaEmploymentSetMemento implements EmploymentSetMemento {

	/** The typed value. */
	private BsymtEmployment typedValue;

	/**
	 * Instantiates a new jpa employment set memento.
	 *
	 * @param typedValue
	 *            the typed value
	 */
	public JpaEmploymentSetMemento(BsymtEmployment typedValue) {
		super();
		this.typedValue = typedValue;
		if (this.typedValue.getBsymtEmploymentPK() == null) {
			this.typedValue.setBsymtEmploymentPK(new BsymtEmploymentPK());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento#setCompanyId(
	 * nts.uk.ctx.bs.employee.dom.common.CompanyId)
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		this.typedValue.getBsymtEmploymentPK().setCid(companyId.v());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento#
	 * setEmploymentCode(nts.uk.ctx.bs.employee.dom.employment.EmploymentCode)
	 */
	@Override
	public void setEmploymentCode(EmploymentCode employmentCode) {
		this.typedValue.getBsymtEmploymentPK().setCode(employmentCode.v());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento#
	 * setEmploymentName(nts.uk.ctx.bs.employee.dom.employment.EmploymentName)
	 */
	@Override
	public void setEmploymentName(EmploymentName employmentName) {
		this.typedValue.setName(employmentName.v());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento#
	 * setEmpExternalCode(nts.uk.ctx.bs.employee.dom.employment.EmpExternalCode)
	 */
	@Override
	public void setEmpExternalCode(EmpExternalCode empExternalCode) {
		this.typedValue.setEmpExternalCode(empExternalCode.v());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento#setMemo(nts.uk
	 * .shr.com.primitive.Memo)
	 */
	@Override
	public void setMemo(Memo memo) {
		this.typedValue.setMemo(memo.v());
	}

	@Override
	public void setEmpCommonMasterId(String empCommonMasterId) {
		this.typedValue.setEmpCommonMasterId(empCommonMasterId);
	}

	
		//this.typedValue.setEmpCommonMasterItemId(empCommonMasterItemId);
	
	@Override
	public void setEmpCommonMasterItemId(String empCommonMasterItemId) {
		this.typedValue.setEmpCommonMasterItemId(empCommonMasterItemId);
		//Optional.ofNullable(empCommonMasterItemId);
		
	}

	
}
