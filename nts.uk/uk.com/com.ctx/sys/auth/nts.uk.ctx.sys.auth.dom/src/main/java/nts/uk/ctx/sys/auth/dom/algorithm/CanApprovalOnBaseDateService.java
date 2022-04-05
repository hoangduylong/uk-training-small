package nts.uk.ctx.sys.auth.dom.algorithm;

import nts.arc.time.GeneralDate;

public interface CanApprovalOnBaseDateService {
	public boolean canApprovalOnBaseDate(String companyId , String employeeID , GeneralDate date);
}
