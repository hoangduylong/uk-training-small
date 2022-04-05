package nts.uk.ctx.sys.gateway.app.command.tenantlogin;

import javax.servlet.http.HttpServletRequest;

import lombok.Data;

@Data
public class TenantAuthenticateCommand {

	private String tenantCode;

	private String password;
	
	private HttpServletRequest request;
	
	public TenantAuthenticateCommand() {
		super();
	}

	public String getTenantCode() {
		return tenantCode.trim();
	}
	
	public void setContractCode(String tenantCode) {
		this.tenantCode = tenantCode.trim();
	}

	public void setContractPassword(String password) {
		this.password = password;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
}
