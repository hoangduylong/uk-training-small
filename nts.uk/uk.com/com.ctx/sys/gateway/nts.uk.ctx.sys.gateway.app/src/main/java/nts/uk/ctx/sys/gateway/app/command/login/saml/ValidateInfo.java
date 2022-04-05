package nts.uk.ctx.sys.gateway.app.command.login.saml;

import java.util.Optional;

import lombok.Data;

@Data
public class ValidateInfo {
	
	private boolean isTenantAuth;
	
	private boolean isSamlValid;
	
	private String requestUrl;
	
	private String errorMessage;
	
	public ValidateInfo(boolean isTenantAuth, boolean isSamlValid, String requestUrl, String errorMessage) {
		this.isTenantAuth = isTenantAuth;
		this.isSamlValid = isSamlValid;
		this.requestUrl = requestUrl;
		this.errorMessage = errorMessage;
	}
	
	public static ValidateInfo failedToAuthTenant() {
		return new ValidateInfo(false, false, null, "Msg_1991");
	}
	
	public static ValidateInfo failedToValidSaml(String errorMessage) {
		return new ValidateInfo(true, false, null, errorMessage);
	}

	public static ValidateInfo successToValidSaml(String requestUrl, Optional<String> msg) {
		return new ValidateInfo(true, true, requestUrl, msg.orElse(null));
	}



}
