/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ws.changepassword;

import lombok.Getter;

/**
 * Gets the company code.
 *
 * @return the company code
 */
@Getter
public class EmployeeInforDto {
	
	/** The contract code. */
	private String contractCode;
	
	/** The employee code. */
	private String employeeCode;
	
	/** The company code. */
	private String companyCode;
}
