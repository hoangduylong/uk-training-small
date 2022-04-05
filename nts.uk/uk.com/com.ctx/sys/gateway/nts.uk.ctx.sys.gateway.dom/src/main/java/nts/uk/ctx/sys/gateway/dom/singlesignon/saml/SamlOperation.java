
package nts.uk.ctx.sys.gateway.dom.singlesignon.saml;

import lombok.Getter;

@Getter
public class SamlOperation {

	private String tenantCode;
	
	private boolean useSingleSignOn;
	
	private String realmName;
	
	private String idpRedirectUrl;
	
	public SamlOperation(String tenantCode, boolean useSingleSignOn, String realmName, String idpRedirectUrl) {
		this.tenantCode = tenantCode;
		this.useSingleSignOn = useSingleSignOn;
		this.realmName = realmName;
		this.idpRedirectUrl = idpRedirectUrl;
	}
}
