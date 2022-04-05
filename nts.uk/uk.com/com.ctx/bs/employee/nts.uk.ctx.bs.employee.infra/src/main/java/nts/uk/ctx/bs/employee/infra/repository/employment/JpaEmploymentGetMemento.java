/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.employment;

import java.util.Optional;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.employment.EmpExternalCode;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentCode;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentName;
import nts.uk.ctx.bs.employee.infra.entity.employment.BsymtEmployment;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Class JpaEmploymentGetMemento.
 */
public class JpaEmploymentGetMemento implements EmploymentGetMemento {

	/** The typed value. */
	private BsymtEmployment typedValue;
	
	/**
	 * Instantiates a new jpa employment get memento.
	 *
	 * @param typedValue the typed value
	 */
	public JpaEmploymentGetMemento(BsymtEmployment typedValue) {
		super();
		this.typedValue = typedValue;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.basic.dom.company.organization.employment.EmploymentGetMemento#getCompanyId()
	 */
	@Override
	public CompanyId getCompanyId() {
		return new CompanyId(this.typedValue.getBsymtEmploymentPK().getCid());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.basic.dom.company.organization.employment.EmploymentGetMemento#getEmploymentCode()
	 */
	@Override
	public EmploymentCode getEmploymentCode() {
		return new EmploymentCode(this.typedValue.getBsymtEmploymentPK().getCode());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.basic.dom.company.organization.employment.EmploymentGetMemento#getEmploymentName()
	 */
	@Override
	public EmploymentName getEmploymentName() {
		return new EmploymentName(this.typedValue.getName());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento#getEmpExternalcode()
	 */
	@Override
	public EmpExternalCode getEmpExternalcode() {
		return new EmpExternalCode(this.typedValue.getEmpExternalCode());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento#getMemo()
	 */
	@Override
	public Memo getMemo() {
		return new Memo(this.typedValue.getMemo());
	}

	@Override
	public Optional<String> empCommonMasterId() {
		return  Optional.ofNullable(this.typedValue.getEmpCommonMasterId());
	}

	@Override
	public Optional<String> empCommonMasterItemId() {
		return Optional.ofNullable(this.typedValue.getEmpCommonMasterItemId());
	}

}
