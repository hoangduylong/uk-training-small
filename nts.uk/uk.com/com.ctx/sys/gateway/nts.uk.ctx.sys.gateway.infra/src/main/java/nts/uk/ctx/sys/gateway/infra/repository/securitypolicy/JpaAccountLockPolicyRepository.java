package nts.uk.ctx.sys.gateway.infra.repository.securitypolicy;

import java.math.BigDecimal;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicyRepository;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.SgwstAccountLockPolicy;

/**
 * The Class JpaAccountLockPolicy.
 */
@Stateless
public class JpaAccountLockPolicyRepository extends JpaRepository implements AccountLockPolicyRepository {
	
	private final String BASIC_SELECT = "select * from SGWMT_ACC_LOCK_POLICY ";

	private SgwstAccountLockPolicy toEntity(AccountLockPolicy accountLockPolicy) {
		return new SgwstAccountLockPolicy(
				accountLockPolicy.getContractCode().v(),
				accountLockPolicy.getErrorCount().v(), 
				new BigDecimal(accountLockPolicy.getLockInterval().v()),
				accountLockPolicy.getLockOutMessage().v() == "" ? "　" : accountLockPolicy.getLockOutMessage().v(),
				new BigDecimal(accountLockPolicy.isUse() ? 1 : 0));
	}
	
	@Override
	public void update(AccountLockPolicy accountLockPolicy) {
		Optional<SgwstAccountLockPolicy> sgwstAccountLockPolicyOptional = this.queryProxy()
				.find(accountLockPolicy.getContractCode().v(), SgwstAccountLockPolicy.class);
		if (sgwstAccountLockPolicyOptional.isPresent()) {
			SgwstAccountLockPolicy sgwstAccountLockPolicy = sgwstAccountLockPolicyOptional.get();
			if (accountLockPolicy.isUse()) {
				sgwstAccountLockPolicy.errorCount = accountLockPolicy.getErrorCount().v();
				sgwstAccountLockPolicy.isUse = new BigDecimal(1);
				sgwstAccountLockPolicy.lockInterval = new BigDecimal(accountLockPolicy.getLockInterval().v());
				sgwstAccountLockPolicy.lockOutMessage = accountLockPolicy.getLockOutMessage().v() == "" ? "　"
						: accountLockPolicy.getLockOutMessage().v();

			} else {
				sgwstAccountLockPolicy.errorCount = new BigDecimal(1);
				sgwstAccountLockPolicy.isUse = new BigDecimal(0);
				sgwstAccountLockPolicy.lockInterval = new BigDecimal(0);
				sgwstAccountLockPolicy.lockOutMessage = "　";
			}
		} else {
			if (accountLockPolicy.isUse()) {
				this.commandProxy().insert(this.toEntity(accountLockPolicy));
			} else {
				this.commandProxy().insert(new SgwstAccountLockPolicy(
						accountLockPolicy.getContractCode().v(),
						new BigDecimal(1), new BigDecimal(0), "　", new BigDecimal(0)));
			}
		}
	}

	@Override
	public Optional<AccountLockPolicy> getAccountLockPolicy(String tenantCode) {
		return this.getAccountLockPolicy(new ContractCode(tenantCode));
	}

	@Override
	public Optional<AccountLockPolicy> getAccountLockPolicy(ContractCode contractCode) {
		String query = BASIC_SELECT 
				+ "where CONTRACT_CD = @contractCode ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("contractCode", contractCode.toString())
				.getSingle(rec -> SgwstAccountLockPolicy.MAPPER.toEntity(rec).toDomain());
	}
}
