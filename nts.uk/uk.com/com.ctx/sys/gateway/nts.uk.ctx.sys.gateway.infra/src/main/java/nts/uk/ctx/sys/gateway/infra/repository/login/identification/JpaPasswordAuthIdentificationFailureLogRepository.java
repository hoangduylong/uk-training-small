package nts.uk.ctx.sys.gateway.infra.repository.login.identification;

import java.util.List;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.uk.ctx.sys.gateway.dom.login.password.identification.PasswordAuthIdentificationFailureLog;
import nts.uk.ctx.sys.gateway.dom.login.password.identification.PasswordAuthIdentificationFailureLogRepository;
import nts.uk.ctx.sys.gateway.infra.entity.login.identification.SgwdtFailLogIdenPassword;
import nts.uk.ctx.sys.gateway.infra.entity.login.identification.SgwdtFailLogIdenPasswordPK;

@Stateless
public class JpaPasswordAuthIdentificationFailureLogRepository extends JpaRepository implements PasswordAuthIdentificationFailureLogRepository {
	
	private final String BASIC_SELECT 
					= "select * from SGWDT_FAIL_LOG_IDEN_PASSWORD ";
	
	private SgwdtFailLogIdenPassword fromDomain(PasswordAuthIdentificationFailureLog domain) {
		return new SgwdtFailLogIdenPassword(
				new SgwdtFailLogIdenPasswordPK(
				domain.getFailureDateTime(), 
				domain.getTriedCompanyId(), 
				domain.getTriedEmployeeCode()));
	}

	@Override
	public void insert(PasswordAuthIdentificationFailureLog domain) {
		this.commandProxy().insert(fromDomain(domain));
	}

	@Override
	public List<PasswordAuthIdentificationFailureLog> find(String companyId) {
		String query = BASIC_SELECT 
				+ "where CID = @companyId ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("companyId", companyId)
				.getList(rec -> SgwdtFailLogIdenPassword.MAPPER.toEntity(rec).toDomain());
	}

}
