package nts.uk.ctx.sys.gateway.app.command.login.saml;

import lombok.Data;
import nts.gul.security.crypt.commonkey.CommonKeyCrypt;
import nts.gul.security.saml.RelayState;

/**
 * 汎用的に実装してあるRelayStateクラスをUK内でルール付けて使用するためのクラス
 *
 */
@Data
public class UkRelayState {

	private String tenantCode;

	private String tenantPassword;
	
	private String requestUrl;
	
	public UkRelayState(String tenantCode, String tenantPassword, String requestUrl) {
		this.tenantCode = tenantCode;
		this.tenantPassword = tenantPassword;
		this.requestUrl = requestUrl;
	}
	
	public String serialize() {
		String encryptedPass = CommonKeyCrypt.encrypt(tenantPassword);
		RelayState relayState = new RelayState();
		relayState.add("tenantCode", tenantCode);
		relayState.add("tenantPassword", encryptedPass);
		relayState.add("requestUrl", requestUrl);
		return relayState.serialize();
	}
	
	public static UkRelayState deserialize(String serializedUkRelayState) {
		RelayState relayState = RelayState.deserialize(serializedUkRelayState);
		return new UkRelayState(
				relayState.get("tenantCode"), 
				CommonKeyCrypt.decrypt(relayState.get("tenantPassword")), 
				relayState.get("requestUrl"));
	}
}
