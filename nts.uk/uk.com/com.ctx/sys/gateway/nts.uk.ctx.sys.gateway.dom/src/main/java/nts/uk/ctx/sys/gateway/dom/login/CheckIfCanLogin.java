package nts.uk.ctx.sys.gateway.dom.login;

import java.util.Optional;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.error.RawErrorMessage;
import nts.uk.ctx.sys.gateway.dom.outage.CheckSystemAvailability;
import nts.uk.ctx.sys.shared.dom.company.CompanyInforImport;

/**
 * ログインできるかチェックする
 */
public class CheckIfCanLogin {

	public static Optional<String> check(Require require, IdentifiedEmployeeInfo identified) {
		
		// 会社が廃止されていないかチェックする
		checkAboloshCompany(require, identified);
		
		// システムが利用できるかチェックする
		Optional<String> msg = checkAbailableSystem(require, identified);
		
		// ログインできる社員かチェックする
		CheckEmployeeAvailability.check(require, identified);
		
		return msg;
	}
	
	/**
	 * 会社が廃止されていないかチェックする
	 * @param require
	 * @param identified
	 */
	private static void checkAboloshCompany(Require require, IdentifiedEmployeeInfo identified) {
		val company = require.getCompanyInforImport(identified.getCompanyId());
		
		if (company.isAbolished()) {
			throw new BusinessException("Msg_281");
		}
	}
	
	/**
	 * システムが利用できるかチェックする
	 * @param require
	 * @param identified
	 */
	private static Optional<String> checkAbailableSystem(Require require, IdentifiedEmployeeInfo identified) {
		val status = CheckSystemAvailability.isAvailable(require, 
				identified.getTenantCode(), 
				identified.getCompanyId(), 
				identified.getUserId());
		
		if (!status.isAvailable()) {
			throw new BusinessException(new RawErrorMessage(status.getMessage().get()));
		}
		
		return status.getMessage();
	}
	
	public static interface Require extends
			CheckSystemAvailability.Require,
			CheckEmployeeAvailability.Require{
		CompanyInforImport getCompanyInforImport(String companyId);
	}
}
