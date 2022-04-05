package nts.uk.ctx.sys.gateway.infra.entity.singlesignon.saml;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;
import lombok.val;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.gul.security.saml.SamlSetting;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="SGWMT_SAML_SETTING")
public class SgwmtSamlSetting extends UkJpaEntity {

	@Id
	@Column(name="CONTRACT_CD")
	private String tenantCode;
	
	@Column(name="IDP_IDENTIFIER")
	private String idpIdentifier;
	
	@Column(name="CERTIFICATE")
	private String certificate;
	
	@Column(name="CLIENT_ID")
	private String clientId;
	
	public static final JpaEntityMapper<SgwmtSamlSetting> MAPPER = new JpaEntityMapper<>(SgwmtSamlSetting.class);

	@SneakyThrows
	public SamlSetting toDomain() {
		val samlSetting = new SamlSetting();
		samlSetting.setIDPEntityId(idpIdentifier);
		samlSetting.setIdpx509Certificate(certificate);
		samlSetting.setSPEntityId(clientId);
		return samlSetting;
	}

	@Override
	protected Object getKey() {
		return tenantCode;
	}
}
