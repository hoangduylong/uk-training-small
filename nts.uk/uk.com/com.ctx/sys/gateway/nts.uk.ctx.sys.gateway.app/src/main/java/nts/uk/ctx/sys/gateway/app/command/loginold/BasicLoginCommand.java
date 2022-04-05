package nts.uk.ctx.sys.gateway.app.command.loginold;

import javax.servlet.http.HttpServletRequest;

public class BasicLoginCommand {
	
	/** The company code. */
	private String companyCode;

	/** The employee code. */
	private String employeeCode;

	/** The password. */
	private String password;

	/** The contract code. */
	private String contractCode;

	/** The contract password. */
	private String contractPassword;
	
	/** The request. */
	private HttpServletRequest request;

	/**
	 * Gets the company code.
	 *
	 * @return the company code
	 */
	public String getCompanyCode() {
		return companyCode.trim();
	}

	/**
	 * Sets the company code.
	 *
	 * @param companyCode
	 *            the new company code
	 */
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode.trim();
	}

	/**
	 * Gets the employee code.
	 *
	 * @return the employee code
	 */
	public String getEmployeeCode() {
		return employeeCode;
	}

	/**
	 * Sets the employee code.
	 *
	 * @param employeeCode
	 *            the new employee code
	 */
	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}

	/**
	 * Gets the password.
	 *
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Sets the password.
	 *
	 * @param password
	 *            the new password
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Gets the contract code.
	 *
	 * @return the contract code
	 */
	public String getContractCode() {
		return contractCode.trim();
	}

	/**
	 * Sets the contract code.
	 *
	 * @param contractCode
	 *            the new contract code
	 */
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode.trim();
	}

	/**
	 * Gets the contract password.
	 *
	 * @return the contract password
	 */
	public String getContractPassword() {
		return contractPassword;
	}

	/**
	 * Sets the contract password.
	 *
	 * @param contractPassword
	 *            the new contract password
	 */
	public void setContractPassword(String contractPassword) {
		this.contractPassword = contractPassword;
	}

	/**
	 * Gets the request.
	 *
	 * @return the request
	 */
	public HttpServletRequest getRequest() {
		return request;
	}

	/**
	 * Sets the request.
	 *
	 * @param request the new request
	 */
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
}
