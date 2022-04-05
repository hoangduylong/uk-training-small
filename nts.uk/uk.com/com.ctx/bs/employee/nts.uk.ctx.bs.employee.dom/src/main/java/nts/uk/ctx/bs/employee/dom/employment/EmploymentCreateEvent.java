/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employment;

import lombok.EqualsAndHashCode;
import lombok.Value;
import nts.arc.layer.dom.event.DomainEvent;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;

/**
 * The Class EmploymentCreateEvent.
 * @author NWS-HOANGDD
 */
// 雇用が新規作成された
@Value
@EqualsAndHashCode(callSuper = false)
public class EmploymentCreateEvent extends DomainEvent{
	
	/** The company id. */
	// 会社ID
	private CompanyId companyId;
	
	/** The employmentcode. */
	// コード
	private EmploymentCode employmentcode;
}

