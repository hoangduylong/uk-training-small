package nts.uk.ctx.sys.gateway.dom.singlesignon.saml;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.security.saml.SamlSetting;

@Stateless
public class FindSamlSetting {
	
	@Inject
	private SamlSettingRepository samlSettingRepository;
	
	public Optional<SamlSetting> find(String tenantCode){
		return samlSettingRepository.find(tenantCode);
	}
}
