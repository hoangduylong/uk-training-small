package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.password;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUser;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.PasswordChangeLogDetail;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.PasswordState;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * ユーザーのログインパスワード
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name="SGWDT_USER_LOGIN_PASSWORD")
public class SgwdtUserLoginPassword extends ContractUkJpaEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/** ユーザID */
	@Id
	@Column(name = "USER_ID")
	private String userId;
	
	/** パスワードの状態 */
	@Column(name = "PASSWORD_STATUS")
	private int passwordStatus;
	
	public static final JpaEntityMapper<SgwdtUserLoginPassword> MAPPER = new JpaEntityMapper<>(SgwdtUserLoginPassword.class);
	
	@Override
	protected Object getKey() {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}
	
	public LoginPasswordOfUser toDomain(List<PasswordChangeLogDetail> changeLog) {
		
		return new LoginPasswordOfUser(
				this.userId, 
				PasswordState.valueOf(this.passwordStatus), 
				changeLog);
	}
	
	public static SgwdtUserLoginPassword toEntity(LoginPasswordOfUser password) {
		return new SgwdtUserLoginPassword(password.getUserId(), password.getPasswordState().value);
	}
}
