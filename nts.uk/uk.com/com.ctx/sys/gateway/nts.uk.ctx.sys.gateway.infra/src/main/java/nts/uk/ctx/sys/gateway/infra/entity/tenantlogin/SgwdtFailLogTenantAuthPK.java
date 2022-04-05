package nts.uk.ctx.sys.gateway.infra.entity.tenantlogin;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDateTime;

/**
 * テナント認証失敗記録PK
 * 
 * @author hiroki_katou
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class SgwdtFailLogTenantAuthPK implements Serializable {
	private static final long serialVersionUID = 1L;

	/** 失敗日時 */
	@Column(name="FAILURE_DATE_TIME")
	private GeneralDateTime failureDateTime;

	/** IPアドレス */
	@Column(name="IP_ADDRESS")
	private String ipv4Address;

	/** ユーザーエージェント */
	@Column(name="USER_AGENT")
	private String userAgent;

	/** 試行したテナントコード */
	@Column(name="TRIED_TENANT_CODE")
	private String triedTenantCode;

	/** 試行したパスワード */
	@Column(name="TRIED_PASSWORD")
	private String triedPassword;
}
