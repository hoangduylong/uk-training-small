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
 * The Class EmploymentDeleteEvent.
 * @author NWS-HoangDD
 */
// 雇用が削除された
@Value
@EqualsAndHashCode(callSuper = false)
public class EmploymentDeleteEvent extends DomainEvent{
	/** The company id. */
	// 会社ID
	private CompanyId companyId;
	
	/** The employmentcode. */
	// コード
	private EmploymentCode employmentcode;
}

