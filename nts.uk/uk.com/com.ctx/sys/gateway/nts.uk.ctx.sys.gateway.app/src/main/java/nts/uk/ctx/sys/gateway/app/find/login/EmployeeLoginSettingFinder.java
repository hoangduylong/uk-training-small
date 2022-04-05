package nts.uk.ctx.sys.gateway.app.find.login;

import javax.ejb.Stateless;

import nts.uk.ctx.sys.gateway.app.find.login.dto.EmployeeLoginSettingDto;

@Stateless
public class EmployeeLoginSettingFinder {

	/** The Constant FIXED_CONTRACTCODE. */
	private static final String FIXED_CONTRACTCODE = "000000000000";

	
	/**
	 * Find by contract code form 3.
	 *
	 * @param contractCode the contract code
	 * @return the employee login setting dto
	 */
	public EmployeeLoginSettingDto findByContractCodeForm3(String contractCode) {
		return new EmployeeLoginSettingDto(false);
	}
}
