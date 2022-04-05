/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employment;

import java.util.Optional;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Interface EmploymentGetMemento.
 */
public interface EmploymentGetMemento {
	
	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	CompanyId getCompanyId();
	
	/**
	 * Gets the employment code.
	 *
	 * @return the employment code
	 */
	EmploymentCode getEmploymentCode();
	
	/**
	 * Gets the employment name.
	 *
	 * @return the employment name
	 */
	EmploymentName getEmploymentName();
	
	/**
	 * Gets the emp externalcode.
	 *
	 * @return the emp externalcode
	 */
	EmpExternalCode getEmpExternalcode();
	
	/**
	 * Gets the memo.
	 *
	 * @return the memo
	 */
	Memo getMemo();
	
	//グループ会社共通マスタID
    Optional <String>  empCommonMasterId();
	// グループ会社共通マスタ項目ID
	Optional <String>  empCommonMasterItemId();
}
