/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * The Class EmployeeGeneralInfoImport.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class EmployeeGeneralInfoImport {
	private boolean lstEmployment;
	
	private boolean lstClassification;
	
	private boolean lstJobTitle;
	
	private boolean lstWorkplace;
}
