package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.password;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.HashedLoginPassword;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUser;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.PasswordChangeLogDetail;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * ユーザーのログインパスワード変更履歴
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name="SGWDT_USER_LOGIN_PASSWORD_CHANGE_LOG")
public class SgwdtUserLoginPasswordChangeLog extends ContractUkJpaEntity{
	
	@EmbeddedId
	public SgwdtUserLoginPasswordChangeLogPK pk;
	
	@Column(name = "HASHED_PASSWORD")
	private String hashedPassword;
	
	public static final JpaEntityMapper<SgwdtUserLoginPasswordChangeLog> MAPPER = new JpaEntityMapper<>(SgwdtUserLoginPasswordChangeLog.class);
	
	@Override
	protected Object getKey() {
		return this.pk;
	}
	
	public PasswordChangeLogDetail toDomain() {
		return new PasswordChangeLogDetail(
				this.pk.getChangeDateTime(), 
				new HashedLoginPassword(this.hashedPassword));
	}
	
	public static List<SgwdtUserLoginPasswordChangeLog> toEntity(LoginPasswordOfUser password) {
		
		return password.getDetails().stream()
				.map(d -> new SgwdtUserLoginPasswordChangeLog(
						new SgwdtUserLoginPasswordChangeLogPK(
								password.getUserId(), 
								d.getChangedDateTime()), 
						d.getHashedPassword().getHash()))
				.collect(Collectors.toList());
	}
}
