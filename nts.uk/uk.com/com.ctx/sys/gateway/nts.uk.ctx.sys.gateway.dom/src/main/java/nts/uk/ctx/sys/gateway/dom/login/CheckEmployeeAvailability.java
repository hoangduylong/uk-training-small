package nts.uk.ctx.sys.gateway.dom.login;

import java.util.Optional;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;
import nts.uk.ctx.sys.shared.dom.employee.employment.SyaEmpHistImport;
import nts.uk.ctx.sys.shared.dom.employee.sycompany.SyaCompanyHistImport;
import nts.uk.ctx.sys.shared.dom.employee.syjobtitle.SyaJobHistImport;
import nts.uk.ctx.sys.shared.dom.employee.syworkplace.SyaWkpHistImport;

/**
 * ログインできる社員かチェックする
 */
public class CheckEmployeeAvailability {

	public static void check(Require require, IdentifiedEmployeeInfo identified) {
		
		// 社員の入退職状況をチェックする
		val affCompany = require.getCompanyHist(identified.getEmployeeId(), GeneralDate.today());
		if(!affCompany.isPresent()) {
			throw new BusinessException("Msg_2169");
		}
		
		// 社員の所属情報が正しいかチェックする
		// 雇用所属履歴
		val affEmp = require.getEmploymentHist(identified.getCompanyId(), identified.getEmployeeId(), GeneralDate.today());
		// 職位所属履歴
		val affJob = require.getJobtitleHist(identified.getCompanyId(), identified.getEmployeeId(), GeneralDate.today());
		// 職場所属履歴
		val affWkp = require.getWorkplaceHist(identified.getCompanyId(), identified.getEmployeeId(), GeneralDate.today());
		
		if(!affEmp.isPresent() || !affJob.isPresent() || !affWkp.isPresent()) {
			throw new BusinessException("Msg_1420");
		}

		// ログインできるユーザかチェックする
		CheckUserAvailability.check(require, identified);
	}
		
	public static interface Require extends 
			AccountLockPolicy.Require, 
			CheckUserAvailability.Require {
		Optional<SyaCompanyHistImport> getCompanyHist(String employeeId, GeneralDate date);
		Optional<SyaEmpHistImport> getEmploymentHist(String companyId, String employeeId, GeneralDate date);
		Optional<SyaJobHistImport> getJobtitleHist(String companyId, String employeeId, GeneralDate date);
		Optional<SyaWkpHistImport> getWorkplaceHist(String companyId, String employeeId, GeneralDate date);
	}
}
