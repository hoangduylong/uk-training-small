package nts.uk.ctx.sys.gateway.dom.singlesignon.saml;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.gul.security.saml.SamlSetting;

@Stateless
public interface SamlSettingRepository {
	
	Optional<SamlSetting> find(String tenantCode);

}
