/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.service;


/**
 * The Enum System.
 */
public enum System {
	
	/** The Employment. */
	//就業
	Employment("emp"),
	
	/** The Salary. */
	//給与
	Salary("sal"),
	
	/** The Human resources. */
	//人事
	Human_Resources("hrm"),

	/** The Personal info. */
	// 人事
	Personal_Info("per"),

	/** The Office helper. */
	// オフィスヘルパー
	Office_Helper("off"),

	/** The My number. */
	// マイナンバー
	My_Number("myn");

	/** The code. */
	public String code;

	/**
	 * Instantiates a new system.
	 *
	 * @param code the code
	 */
	private System(String code) {
		this.code = code;
	}
	
	/**
	 * Value of code.
	 *
	 * @param code the code
	 * @return the system
	 */
	public static System valueOfCode(String code) {
		// Invalid object.
		if (code == null) {
			return null;
		}

		// Find value.
		for (System val : System.values()) {
			if (val.code.equals(code)) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
