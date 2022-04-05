package nts.uk.ctx.sys.gateway.infra.entity.login.authnticate;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationFailureLog;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * パスワード認証失敗記録
 * 
 * @author hiroki_katou
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="SGWDT_FAIL_LOG_PASSWORD_AUTH")
public class SgwdtFailLogPasswordAuth extends UkJpaEntity{
	
	@EmbeddedId
	public SgwdtFailLogPasswordAuthPK pk;

	@Override
	protected Object getKey() {
		return this.pk;
	}
	
	public static final JpaEntityMapper<SgwdtFailLogPasswordAuth> MAPPER = new JpaEntityMapper<>(SgwdtFailLogPasswordAuth.class);

	public PasswordAuthenticationFailureLog toDomain() {
		return new PasswordAuthenticationFailureLog(
				pk.getFailureDateTime(), 
				pk.getTriedUserId(), 
				pk.getTriedPassword());
	}
}
