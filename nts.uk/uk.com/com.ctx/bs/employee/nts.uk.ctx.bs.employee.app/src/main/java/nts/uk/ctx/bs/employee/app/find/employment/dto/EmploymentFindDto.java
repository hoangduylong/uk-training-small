/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employment.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.employment.EmpExternalCode;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentCode;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentName;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterItem;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterName;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Class EmploymentFindDto.
 */
@Getter
@Setter
public class EmploymentFindDto extends EmploymentDto implements EmploymentSetMemento {

	/** The code. */
	private String code;

	/** The name. */
	private String name;

	/** The emp external code. */
	private String empExternalCode;

	/** The memo. */
	private String memo;
	//グループ会社共通マスタID
	private String empCommonMasterId;
	// グループ会社共通マスタ項目ID
	private String empCommonMasterItemId;

	private boolean showsGroupCompany;
	
	private String commonMasterName;
	
	private List<CommonMaterItemDto> commonMasterItems;
	
	private String errMessage;
	
	private String commonMasterItemId;
	
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.basic.dom.company.organization.employment.EmploymentSetMemento
	 * #setCompanyId(nts.uk.ctx.basic.dom.company.organization.CompanyId)
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		// Nothing
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.basic.dom.company.organization.employment.EmploymentSetMemento
	 * #setEmploymentCode(nts.uk.ctx.basic.dom.company.organization.employment.
	 * EmploymentCode)
	 */
	@Override
	public void setEmploymentCode(EmploymentCode employmentCode) {
		this.code = employmentCode.v();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.basic.dom.company.organization.employment.EmploymentSetMemento
	 * #setEmploymentName(nts.uk.ctx.basic.dom.company.organization.employment.
	 * EmploymentName)
	 */
	@Override
	public void setEmploymentName(EmploymentName employmentName) {
		this.name = employmentName.v();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento#
	 * setEmpExternalCode(nts.uk.ctx.bs.employee.dom.employment.EmpExternalCode)
	 */
	@Override
	public void setEmpExternalCode(EmpExternalCode empExternalCode) {
		this.empExternalCode = empExternalCode.v();
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.employment.EmploymentSetMemento#setMemo(nts.uk.shr.com.primitive.Memo)
	 */
	@Override
	public void setMemo(Memo memo) {
		this.memo = memo.v();
	}

	@Override
	public void setEmpCommonMasterId(String empCommonMasterId) {
		this.empCommonMasterId = empCommonMasterId;
	}

	@Override
	public void setEmpCommonMasterItemId(String empCommonMasterItemId) {
		this.empCommonMasterItemId = empCommonMasterItemId;	
	}

}
