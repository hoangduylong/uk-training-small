package nts.uk.ctx.sys.gateway.app.command.login.saml;

import lombok.Data;

@Data
public class AuthenticateInfo {
	
	private boolean useSamlSso;
	
	// JavaScriptではOptionalが使えないのでnullで運用
	private String authenUrl;

	private String errorMessage;
	
	public AuthenticateInfo(boolean useSamlSso, String authenUrl, String errorMessage) {
		this.useSamlSso = useSamlSso;
		this.authenUrl = authenUrl;
		this.errorMessage = errorMessage;
	}
}
