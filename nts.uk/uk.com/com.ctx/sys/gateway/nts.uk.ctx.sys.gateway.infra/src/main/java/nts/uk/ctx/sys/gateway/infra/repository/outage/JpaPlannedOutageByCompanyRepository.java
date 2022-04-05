package nts.uk.ctx.sys.gateway.infra.repository.outage;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.uk.ctx.sys.gateway.dom.outage.company.PlannedOutageByCompany;
import nts.uk.ctx.sys.gateway.dom.outage.company.PlannedOutageByCompanyRepository;
import nts.uk.ctx.sys.gateway.infra.entity.stopbycompany.SgwdtStopByCompany;
import nts.uk.ctx.sys.gateway.infra.entity.stopbycompany.SgwdtStopByCompanyPK;
import nts.uk.shr.com.company.CompanyId;

@Stateless
public class JpaPlannedOutageByCompanyRepository extends JpaRepository implements PlannedOutageByCompanyRepository {
	
	private final String BASIC_SELECT = "select * from SGWMT_STOP_BY_COMPANY ";
	
	private SgwdtStopByCompany toEntity(PlannedOutageByCompany domain) {
		return new SgwdtStopByCompany(
				new SgwdtStopByCompanyPK(
						CompanyId.getTenantCode(domain.getCompanyId()), 
						//CompanyInforImport.extractTenantCode(domain.getCompanyId()), 
						CompanyId.getCompanyCode(domain.getCompanyId())), 
						//CompanyInforImport.extractCompanyCode(domain.getCompanyId())), 
				domain.getState().getSystemAvailability().value, 
				domain.getState().getNoticeMessage().toString(), 
				domain.getState().getOutageMode().value, 
				domain.getState().getOutageMessage().toString());
	}
	
	@Override
	public void insert(PlannedOutageByCompany domain) {
		this.commandProxy().insert(toEntity(domain));
	}

	@Override
	public void update(PlannedOutageByCompany domain) {
		this.commandProxy().update(toEntity(domain));
	}

	@Override
	public Optional<PlannedOutageByCompany> find(String companyId) {
		String query = BASIC_SELECT 
				+ "where CONTRACT_CD = @tenantCode "
				+ "and COMPANY_CD = @companyCode ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("tenantCode", CompanyId.getTenantCode(companyId))
				.paramString("companyCode", CompanyId.getCompanyCode(companyId))
				.getSingle(rec -> SgwdtStopByCompany.MAPPER.toEntity(rec).toDomain());
	}
}
