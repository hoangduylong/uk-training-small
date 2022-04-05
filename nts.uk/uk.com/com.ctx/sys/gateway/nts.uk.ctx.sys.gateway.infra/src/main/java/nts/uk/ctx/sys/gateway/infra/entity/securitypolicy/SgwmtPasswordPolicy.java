package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.val;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.complexity.PasswordComplexityRequirement;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "SGWMT_PASSWORD_POLICY")
public class SgwmtPasswordPolicy extends UkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "CONTRACT_CD")
	public String contractCd;
	@Column(name = "NOTIFICATION_PASSWORD_CHANGE")
	public int notificationPasswordChange;
	@Column(name = "LOGIN_CHECK")
	public boolean loginCheck;
	@Column(name = "INITIAL_PASSWORD_CHANGE")
	public boolean initialPasswordChange;
	@Column(name = "IS_USE")
	public boolean isUse;
	@Column(name = "HISTORY_COUNT")
	public int historyCount;
	@Column(name = "LOWEST_DIGITS")
	public int lowestDigits;
	@Column(name = "VALIDITY_PERIOD")
	public int validityPeriod;
	@Column(name = "NUMBER_OF_DIGITS")
	public int numberOfDigits;
	@Column(name = "SYMBOL_CHARACTERS")
	public int symbolCharacters;
	@Column(name = "ALPHABET_DIGIT")
	public int alphabetDigit;
	
	public static final JpaEntityMapper<SgwmtPasswordPolicy> MAPPER = new JpaEntityMapper<>(SgwmtPasswordPolicy.class);

	@Override
	protected Object getKey() {
		return this.contractCd;
	}
	
	public PasswordPolicy toDomain() {
		
		val complexity = PasswordComplexityRequirement.createFromJavaType(
				lowestDigits,
				alphabetDigit,
				numberOfDigits,
				symbolCharacters);
		
		return PasswordPolicy.createFromJavaType(
				contractCd,
				notificationPasswordChange,
				loginCheck,
				initialPasswordChange,
				isUse,
				historyCount,
				validityPeriod,
				complexity);
	}


}
