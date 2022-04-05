package nts.uk.ctx.sys.gateway.infra.repository.outage;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.uk.ctx.sys.gateway.dom.outage.tenant.PlannedOutageByTenant;
import nts.uk.ctx.sys.gateway.dom.outage.tenant.PlannedOutageByTenantRepository;
import nts.uk.ctx.sys.gateway.infra.entity.stopbysystem.SgwdtStopBySystem;

@Stateless
public class JpaPlannedOutageByTenantRepository extends JpaRepository implements PlannedOutageByTenantRepository{
	
	private final String BASIC_SELECT = "select * from SGWMT_STOP_BY_SYSTEM ";
	
	private SgwdtStopBySystem toEntity(PlannedOutageByTenant domain) {
		return new SgwdtStopBySystem(
				domain.getTenantCode(), 
				domain.getState().getSystemAvailability().value, 
				domain.getState().getNoticeMessage().toString(), 
				domain.getState().getOutageMode().value, 
				domain.getState().getOutageMessage().toString());
	}

	@Override
	public void insert(PlannedOutageByTenant domain) {
		this.commandProxy().insert(toEntity(domain));
	}

	@Override
	public void update(PlannedOutageByTenant domain) {
		this.commandProxy().update(toEntity(domain));
	}

	@Override
	public Optional<PlannedOutageByTenant> find(String tenantCode) {
		String query = BASIC_SELECT 
				+ "where CONTRACT_CD = @tenantCode ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("tenantCode", tenantCode)
				.getSingle(rec -> SgwdtStopBySystem.MAPPER.toEntity(rec).toDomain());
	}
}
