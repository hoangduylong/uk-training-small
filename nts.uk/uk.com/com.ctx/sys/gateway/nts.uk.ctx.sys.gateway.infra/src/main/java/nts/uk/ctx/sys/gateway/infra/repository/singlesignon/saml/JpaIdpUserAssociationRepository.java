package nts.uk.ctx.sys.gateway.infra.repository.singlesignon.saml;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.uk.ctx.sys.gateway.dom.singlesignon.saml.IdpUserAssociation;
import nts.uk.ctx.sys.gateway.dom.singlesignon.saml.IdpUserAssociationRepository;
import nts.uk.ctx.sys.gateway.infra.entity.singlesignon.saml.SgwmtIdpUserAssociatation;

@Stateless
public class JpaIdpUserAssociationRepository extends JpaRepository implements IdpUserAssociationRepository {
	
	private final String BASIC_SELECT 
					= "select * from SGWMT_SAML_USER_ASSOCIATION ";
	
	private SgwmtIdpUserAssociatation fromDomain(IdpUserAssociation domain) {
		return new SgwmtIdpUserAssociatation(
				domain.getCompanyId(),
				domain.getEmployeeId(), 
				domain.getIdpUserName());
	}

	@Override
	public void insert(IdpUserAssociation domain) {
		this.commandProxy().insert(fromDomain(domain));
	}

	@Override
	public void delete(IdpUserAssociation domain) {
		this.commandProxy().remove(fromDomain(domain));
	}

	@Override
	public Optional<IdpUserAssociation> findByEmployee(String employeeId) {
		String query = BASIC_SELECT 
				+ "where SID = @employeeId ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("employeeId", employeeId)
				.getSingle(rec -> SgwmtIdpUserAssociatation.MAPPER.toEntity(rec).toDomain());
	}

	@Override
	public Optional<IdpUserAssociation> findByIdpUser(String idpUserId) {
		String query = BASIC_SELECT 
				+ "where IDP_USER_NAME = @idpUserId ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("idpUserId", idpUserId)
				.getSingle(rec -> SgwmtIdpUserAssociatation.MAPPER.toEntity(rec).toDomain());
	}
}
