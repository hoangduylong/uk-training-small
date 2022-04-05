package nts.uk.ctx.sys.gateway.infra.entity.login.identification;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDateTime;

/**
 * 	パスワード認証による社員の識別失敗記録PK
 * 
 * @author hiroki_katou
 *
 */
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SgwdtFailLogIdenPasswordPK implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "FAILURE_DATE_TIME")
	private GeneralDateTime failureDateTime;
	
	@Column(name = "TRIED_COMPANY_ID")
	private String triedCompanyId;
	
	@Column(name = "TRIED_EMPLOYEE_CODE")
	private String triedEmployeeCode;
}
