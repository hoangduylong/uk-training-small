package nts.uk.ctx.sys.gateway.infra.entity.singlesignon.saml;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang3.BooleanUtils;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.singlesignon.saml.SamlOperation;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="SGWMT_SAML_OPERATION")
public class SgwmtSamlOperation extends UkJpaEntity {

	@Id
	@Column(name="CONTRACT_CD")
	private String tenantCode;
	
	@Column(name="USE_SAML_SSO")
	private int useSingleSignOn;
	
	@Column(name="REALM_NAME")
	private String realmName;
	
	@Column(name="IDP_REDIRECT_URL")
	private String idpRedirectUrl;
	
	public static final JpaEntityMapper<SgwmtSamlOperation> MAPPER = new JpaEntityMapper<>(SgwmtSamlOperation.class);
	
	public SamlOperation toDomain() {
		return new SamlOperation(tenantCode, BooleanUtils.toBoolean(useSingleSignOn), realmName, idpRedirectUrl);
	}

	@Override
	protected Object getKey() {
		return tenantCode;
	}
}
