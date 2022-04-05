/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employment;

import java.util.Optional;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Interface EmploymentSetMemento.
 */
public interface EmploymentSetMemento {
	
	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	void setCompanyId(CompanyId companyId);
	
	/**
	 * Sets the employment code.
	 *
	 * @param employmentCode the new employment code
	 */
	void setEmploymentCode(EmploymentCode employmentCode);
	
	/**
	 * Sets the employment name.
	 *
	 * @param employmentName the new employment name
	 */
	void setEmploymentName(EmploymentName employmentName);
	
	/**
	 * Sets the emp external code.
	 *
	 * @param empExternalCode the new emp external code
	 */
	void setEmpExternalCode(EmpExternalCode empExternalCode);
	
	/**
	 * Sets the memo.
	 *
	 * @param memo the new memo
	 */
	void setMemo(Memo memo);
	
	//グループ会社共通マスタID
	void setEmpCommonMasterId(String  empCommonMasterId);
	
	// グループ会社共通マスタ項目ID
	void setEmpCommonMasterItemId(String  empCommonMasterItemId); 
	
	
}
