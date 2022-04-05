package nts.uk.shr.sample.batchserver;

import javax.ejb.Stateless;

import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

@Stateless
public class BatchTask {
	
	public BatchResult doSomething() {
		LoginUserContext loginContext = AppContexts.user();
		
		System.out.println("contract-code: " + loginContext.contractCode());
		System.out.println("company-code: " + loginContext.companyCode());
		System.out.println("company-id: " + loginContext.companyId());
		System.out.println("employee-id: " + loginContext.employeeId());
		System.out.println("employee-code: " + loginContext.employeeCode());
		
		return new BatchResult(true, "done!");
	}

}
