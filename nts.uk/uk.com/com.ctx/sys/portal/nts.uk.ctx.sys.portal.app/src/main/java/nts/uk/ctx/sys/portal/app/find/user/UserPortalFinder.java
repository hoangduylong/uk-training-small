package nts.uk.ctx.sys.portal.app.find.user;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.adapter.person.PersonInfoAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.role.LoginResponsibleDto;
import nts.uk.ctx.sys.portal.dom.adapter.role.RoleGrantAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.user.UserAdapter;
import nts.uk.ctx.sys.shared.dom.user.builtin.BuiltInUser;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

@Stateless
public class UserPortalFinder {
	
	@Inject
	private UserAdapter userAdapter;
	
	@Inject
    private PersonInfoAdapter personInfoAdapter;
	
	@Inject
	private RoleGrantAdapter roleGrantAdapter;
	/**
	 * CCG020_メニュー.初期表示.社員名表示
	 * @return
	 */
	public String userName() {
		LoginUserContext userCtx = AppContexts.user();
		
		// ビルトインユーザ
		if (BuiltInUser.USER_ID.equals(userCtx.userId())) {
			return userCtx.employeeCode();
		}
		
		//hoatt 2019.01.15
		//EA修正履歴 No.3071
		//imported（GateWay）「社員.社員名」を取得する Request:No.18
		Optional<String> userName = Optional.empty();
		if(userCtx.isEmployee()){
			userName = personInfoAdapter.getEmpName(userCtx.companyId(), userCtx.employeeCode());
			if(userName.isPresent()){
				return userName.get();
			}
		}
        //imported（GateWay）「ユーザ」を取得する RQ#169
		userName = userAdapter.getUserName(userCtx.userId());
		if(userName.isPresent()){
			return userName.get();
		}
		return "";
	}
	
	public boolean showManual() {
		LoginUserContext userCtx = AppContexts.user();
		if (userCtx.roles().forSystemAdmin() != null || userCtx.roles().forCompanyAdmin() != null) 
			return true;
		
		LoginResponsibleDto responsible = roleGrantAdapter.getLoginResponsible();
		if (responsible.isWork() || responsible.isSalary() || responsible.isPersonalInfo())
			return true;
		
		return false;
	}
}
