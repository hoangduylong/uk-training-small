package nts.uk.ctx.sys.gateway.app.command.login.password;

import javax.servlet.http.HttpServletRequest;

import lombok.Data;
import nts.arc.error.BusinessException;
import nts.gul.text.StringUtil;
import nts.uk.ctx.sys.gateway.app.command.login.LoginCommandHandlerBase;

@Data
public class PasswordAuthenticateCommand implements LoginCommandHandlerBase.TenantAuth {

	private String contractCode;

	private String contractPassword;
	
	private String companyCode;
	
	private String employeeCode;
	
	private String password;
	
	private HttpServletRequest request;

	@Override
	public String getTenantCode() {
		return this.contractCode;
	}

	@Override
	public String getTenantPasswordPlainText() {
		return this.contractPassword;
	}
	
	/**
	 * 入力チェック
	 */
	public void checkInput() {
		// 社員コードが未入力でないかチェック
		if (StringUtil.isNullOrEmpty(employeeCode, true)) {
			throw new BusinessException("Msg_312");
		}
		// パスワードが未入力でないかチェック
		if (StringUtil.isNullOrEmpty(password, false)) {
			throw new BusinessException("Msg_310");
		}
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
}
