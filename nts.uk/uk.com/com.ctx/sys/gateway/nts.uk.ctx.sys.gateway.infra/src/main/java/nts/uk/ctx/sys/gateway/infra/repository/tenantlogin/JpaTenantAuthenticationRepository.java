package nts.uk.ctx.sys.gateway.infra.repository.tenantlogin;

import java.util.Optional;
import java.util.function.Function;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthentication;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationRepository;
import nts.uk.ctx.sys.gateway.infra.entity.tenantlogin.SgwmtTenantAuthenticate;

@Stateless
public class JpaTenantAuthenticationRepository extends JpaRepository implements TenantAuthenticationRepository {
	
	private final String BASIC_SELECT 
					= "select * from SGWMT_TENANT_AUTHENTICATION ";
	
	private SgwmtTenantAuthenticate fromDomain(TenantAuthentication domain) {
		return new SgwmtTenantAuthenticate(
				domain.getTenantCode(), 
				domain.getHashedPassword(), 
				domain.getAvailablePeriod().start(), 
				domain.getAvailablePeriod().end());
	}
	
	@Override
	public void insert(TenantAuthentication domain) {
		this.commandProxy().insert(fromDomain(domain));
	}
	
	@Override
	public void update(TenantAuthentication domain) {
		this.commandProxy().update(fromDomain(domain));
	}
	
	@Override
	public void delete(TenantAuthentication domain) {
		this.commandProxy().remove(fromDomain(domain));
	}
	
	@Override
	public Optional<TenantAuthentication> find(String tenantCode) {
		String query = BASIC_SELECT 
				+ "where CONTRACT_CD = @tenantCode ";
		return this.forTenantDatasource(tenantCode, (em ->{
			return this.jdbcProxy(em) .query(query)
					.paramString("tenantCode", tenantCode)
					.getSingle(rec -> SgwmtTenantAuthenticate.MAPPER.toEntity(rec).toDomain());			
		}));
	}

	@Override
	public Optional<TenantAuthentication> find(String tenantCode, GeneralDate Date) {
		String query = BASIC_SELECT 
				+ "where CONTRACT_CD = @tenantCode "
				+ "and START_DATE <= @startDate "
				+ "and END_DATE >= @endDate ";
		
		return this.forTenantDatasource(tenantCode, (em -> {
			return this.jdbcProxy(em).query(query)
				.paramString("tenantCode", tenantCode)
				.paramDate("startDate", Date)
				.paramDate("endDate", Date)
				.getSingle(rec -> SgwmtTenantAuthenticate.MAPPER.toEntity(rec).toDomain());
		}));
	}

}
