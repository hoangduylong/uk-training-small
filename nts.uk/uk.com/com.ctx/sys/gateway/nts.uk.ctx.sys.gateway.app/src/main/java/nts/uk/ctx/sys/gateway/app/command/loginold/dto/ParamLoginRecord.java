/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.command.loginold.dto;

import lombok.NoArgsConstructor;

/**
 * Instantiates a new param login record.
 */
@NoArgsConstructor
public class ParamLoginRecord {
	
	/** The company id. */
	public String companyId;
	
	/** The login method. */
	public Integer loginMethod;
	
	/** The login status. */
	public Integer loginStatus;
	
	/** The remark. */
	public String remark;
	
	/** The employee id. */
	public String employeeId;
	
	/**
	 * Instantiates a new param login record.
	 *
	 * @param companyId the company id
	 * @param loginMethod the login method
	 * @param loginStatus the login status
	 * @param remark the remark
	 * @param employeeId the employee id
	 */
	public ParamLoginRecord(String companyId, Integer loginMethod, Integer loginStatus, String remark, String employeeId){
		this.companyId = companyId;
		this.loginMethod = loginMethod;
		this.loginStatus = loginStatus;
		this.remark = remark;
		this.employeeId = employeeId;
	}

}
