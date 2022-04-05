package nts.uk.ctx.sys.gateway.infra.entity.singlesignon.saml;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.singlesignon.saml.IdpUserAssociation;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="SGWMT_SAML_USER_ASSOCIATION")
public class SgwmtIdpUserAssociatation extends ContractUkJpaEntity {
	
	@Column(name="CID")
	private String companyId;
	
	@Id
	@Column(name="SID")
	private String employeeId;
	
	@Column(name="IDP_USER_NAME")
	private String idpUserName;
	
	public static final JpaEntityMapper<SgwmtIdpUserAssociatation> MAPPER = new JpaEntityMapper<>(SgwmtIdpUserAssociatation.class);
	
	public IdpUserAssociation toDomain() {
		return new IdpUserAssociation(getContractCd(), companyId, employeeId, idpUserName);
	}

	@Override
	protected Object getKey() {
		return employeeId;
	}
}