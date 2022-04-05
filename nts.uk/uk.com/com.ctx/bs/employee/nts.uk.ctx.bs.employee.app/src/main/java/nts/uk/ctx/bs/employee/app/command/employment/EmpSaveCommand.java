/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.employment;

import java.util.Optional;

import lombok.Data;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.employment.EmpExternalCode;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentCode;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentName;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Class EmpSaveCommand.
 */
@Data
public class EmpSaveCommand implements EmploymentGetMemento {
	
	/** The employment code. */
	private String employmentCode;
	
	/** The employment name. */
	private String employmentName;
	
	/** The emp external code. */
	private String empExternalCode;
	
	/** The memo. */
	private String memo;
	
	/** The is update mode. */
	private Boolean isUpdateMode;
	//グループ会社共通マスタID
	private String commonMasterName;
	// グループ会社共通マスタ項目ID
	private String selectedCodeMaster;
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento#getCompanyId()
	 */
	@Override
	public CompanyId getCompanyId() {
		return new CompanyId(AppContexts.user().companyId());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento#getEmploymentCode()
	 */
	@Override
	public EmploymentCode getEmploymentCode() {
		return new EmploymentCode(this.employmentCode);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento#getEmploymentName()
	 */
	@Override
	public EmploymentName getEmploymentName() {
		return new EmploymentName(this.employmentName);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento#getEmpExternalcode()
	 */
	@Override
	public EmpExternalCode getEmpExternalcode() {
		return new EmpExternalCode(this.empExternalCode);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentGetMemento#getMemo()
	 */
	@Override
	public Memo getMemo() {
		return new Memo(this.memo);
	}

	@Override
	public Optional<String> empCommonMasterId() {
		return Optional.of(commonMasterName);
	}

	@Override
	public Optional<String> empCommonMasterItemId() {
		return Optional.ofNullable(selectedCodeMaster);
	}

}
