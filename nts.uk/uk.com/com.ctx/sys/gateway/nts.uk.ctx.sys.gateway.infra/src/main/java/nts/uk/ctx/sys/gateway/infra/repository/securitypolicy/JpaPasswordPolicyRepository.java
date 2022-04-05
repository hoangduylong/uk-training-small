package nts.uk.ctx.sys.gateway.infra.repository.securitypolicy;

import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicyRepository;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.SgwmtPasswordPolicy;

/**
 * The Class JpaPasswordPolicyRepository.
 */
@Stateless
public class JpaPasswordPolicyRepository extends JpaRepository implements PasswordPolicyRepository {
	
	private final String BASIC_SELECT 
					= "select * from SGWMT_PASSWORD_POLICY ";
	
	private SgwmtPasswordPolicy fromDomain(PasswordPolicy domain) {
		return new SgwmtPasswordPolicy(domain.getContractCode().v(),
				domain.getNotificationPasswordChange().v().intValue(),
				domain.isLoginCheck(),
				domain.isInitialPasswordChange(),
				domain.isUse(),
				domain.getHistoryCount().v().intValue(),
				domain.getComplexityRequirement().getMinimumLength().v().intValue(),
				domain.getValidityPeriod().v().intValue(),
				domain.getComplexityRequirement().getNumeralDigits().v().intValue(),
				domain.getComplexityRequirement().getSymbolDigits().v().intValue(),
				domain.getComplexityRequirement().getAlphabetDigits().v().intValue());
	}
	
	@Override
	public void insert(PasswordPolicy domain) {
		this.commandProxy().insert(fromDomain(domain));
	}
	
	@Override
	public void update(PasswordPolicy domain) {
		this.commandProxy().update(fromDomain(domain));
	}
	
	@Override
	public PasswordPolicy getPasswordPolicy(String tenantCode) {
		return getPasswordPolicy(new ContractCode(tenantCode));
	}
	
	@Override
	public PasswordPolicy getPasswordPolicy(ContractCode contractCd) {
		
		String query = BASIC_SELECT 
				+ "where CONTRACT_CD = @contractCd ";
		val result = new NtsStatement(query, this.jdbcProxy())
				.paramString("contractCd", contractCd.toString())
				.getSingle(p -> SgwmtPasswordPolicy.MAPPER.toEntity(p).toDomain());
		if(result.isPresent()) {
			return result.get();
		}
		
		return PasswordPolicy.createNotUse(contractCd.toString());
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.PasswordPolicyRepository#updatePasswordPolicy(nts.uk.ctx.sys.gateway.dom.securitypolicy.PasswordPolicy)
	 */
	@Override
	public void updatePasswordPolicy(PasswordPolicy passwordPolicy) {
		
		Optional<SgwmtPasswordPolicy> sgwstPasswordPolicyOPtional = this.queryProxy()
				.find(passwordPolicy.getContractCode().v(), SgwmtPasswordPolicy.class);
		
		if (sgwstPasswordPolicyOPtional.isPresent()) {
			SgwmtPasswordPolicy sgwstPasswordPolicy = sgwstPasswordPolicyOPtional.get();
			sgwstPasswordPolicy.notificationPasswordChange = passwordPolicy.getNotificationPasswordChange().v().intValue();
			sgwstPasswordPolicy.loginCheck = passwordPolicy.isLoginCheck();
			sgwstPasswordPolicy.initialPasswordChange = passwordPolicy.isInitialPasswordChange();
			sgwstPasswordPolicy.isUse = passwordPolicy.isUse();
			sgwstPasswordPolicy.historyCount = passwordPolicy.getHistoryCount().v().intValue();
			sgwstPasswordPolicy.lowestDigits = passwordPolicy.getComplexityRequirement().getMinimumLength().v();
			sgwstPasswordPolicy.validityPeriod = passwordPolicy.getValidityPeriod().v().intValue();
			sgwstPasswordPolicy.numberOfDigits = passwordPolicy.getComplexityRequirement().getNumeralDigits().v();
			sgwstPasswordPolicy.symbolCharacters = passwordPolicy.getComplexityRequirement().getSymbolDigits().v();
			sgwstPasswordPolicy.alphabetDigit = passwordPolicy.getComplexityRequirement().getAlphabetDigits().v();

		} else {
			this.commandProxy().insert(this.fromDomain(passwordPolicy));
		}
	}
}
