package nts.uk.ctx.sys.gateway.infra.entity.login.authnticate;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDateTime;

/**
 * パスワード認証失敗記録PK
 * 
 * @author hiroki_katou
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class SgwdtFailLogPasswordAuthPK implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "FAILURE_DATE_TIME")
	private GeneralDateTime failureDateTime;

	@Column(name = "TRIED_USER_ID")
	private String triedUserId;
	
	@Column(name = "TRIED_PASSWORD")
	private String triedPassword;

}
