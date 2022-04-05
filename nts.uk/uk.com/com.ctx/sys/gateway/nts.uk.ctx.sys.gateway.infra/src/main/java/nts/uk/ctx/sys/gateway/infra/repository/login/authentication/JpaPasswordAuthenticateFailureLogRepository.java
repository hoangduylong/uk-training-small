package nts.uk.ctx.sys.gateway.infra.repository.login.authentication;

import java.util.List;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationFailureLog;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationFailureLogRepository;
import nts.uk.ctx.sys.gateway.infra.entity.login.authnticate.SgwdtFailLogPasswordAuth;
import nts.uk.ctx.sys.gateway.infra.entity.login.authnticate.SgwdtFailLogPasswordAuthPK;

@Stateless
public class JpaPasswordAuthenticateFailureLogRepository extends JpaRepository implements PasswordAuthenticationFailureLogRepository{

	private final String BASIC_SELECT = "select * from SGWDT_FAIL_LOG_PASSWORD_AUTH ";
	
	private SgwdtFailLogPasswordAuth toEntity(PasswordAuthenticationFailureLog domain) {
		return new SgwdtFailLogPasswordAuth(
				new SgwdtFailLogPasswordAuthPK(
					domain.getFailureDateTime(),
					domain.getTriedUserId(), 
					domain.getTriedPassword()));
	}
	
	public void insert(PasswordAuthenticationFailureLog log) {
		this.commandProxy().insert(toEntity(log));
	}

	@Override
	public List<PasswordAuthenticationFailureLog> find(String userId) {
		String query = BASIC_SELECT 
				+ " where TRIED_USER_ID = @userId ";
		
		return this.jdbcProxy().query(query)
				.paramString("userId", userId)
				.getList(rec -> SgwdtFailLogPasswordAuth.MAPPER.toEntity(rec).toDomain());
	}

	@Override
	public List<PasswordAuthenticationFailureLog> find(String userId, GeneralDateTime startDateTime, GeneralDateTime endDateTime) {
		String query = BASIC_SELECT 
				+ " where TRIED_USER_ID = @userId "
				+ " and FAILURE_DATE_TIME >= @startDateTime"
				+ " and FAILURE_DATE_TIME <= @endDateTime";
		
		return this.jdbcProxy().query(query)
				.paramString("userId", userId)
				.paramDateTime("startDateTime", startDateTime)
				.paramDateTime("endDateTime", endDateTime)
				.getList(rec -> SgwdtFailLogPasswordAuth.MAPPER.toEntity(rec).toDomain());
	}
}
