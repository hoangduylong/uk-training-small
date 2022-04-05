package nts.uk.ctx.sys.gateway.infra.repository.singlesignon.saml;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.gul.security.saml.SamlSetting;
import nts.uk.ctx.sys.gateway.dom.singlesignon.saml.SamlSettingRepository;
import nts.uk.ctx.sys.gateway.infra.entity.singlesignon.saml.SgwmtSamlSetting;

@Stateless
public class JpaSamlSettingRepository extends JpaRepository implements SamlSettingRepository {
	
	private final String BASIC_SELECT 
					= "select * from SGWMT_SAML_SETTING ";

	@Override
	public Optional<SamlSetting> find(String tenantCode) {
		String query = BASIC_SELECT 
				+ "where CONTRACT_CD = @tenantCode ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("tenantCode", tenantCode)
				.getSingle(rec -> SgwmtSamlSetting.MAPPER.toEntity(rec).toDomain());
	}
}
