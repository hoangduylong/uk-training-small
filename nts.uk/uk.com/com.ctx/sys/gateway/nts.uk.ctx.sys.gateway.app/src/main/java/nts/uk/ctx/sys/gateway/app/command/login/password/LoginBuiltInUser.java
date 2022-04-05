package nts.uk.ctx.sys.gateway.app.command.login.password;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.val;
import nts.uk.ctx.sys.shared.dom.company.CompanyInforImport;
import nts.uk.ctx.sys.shared.dom.user.builtin.BuiltInUser;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class LoginBuiltInUser {
	
	@Inject
	private LoginUserContextManager manager;
	
	public void login(RequireLogin require, String tenantCode, String companyId) {
		
		String companyCode = require.getCompanyInforImport(companyId).getCompanyCode();
		
		val builtInUser = require.getBuiltInUser(tenantCode, companyId);
		
		builtInUser.setupLoginUserContext(manager, tenantCode, companyId, companyCode);
	}
	
	public static interface RequireLogin {
		
		CompanyInforImport getCompanyInforImport(String companyId);

		BuiltInUser getBuiltInUser(String tenantCode, String companyId);
	}
}
