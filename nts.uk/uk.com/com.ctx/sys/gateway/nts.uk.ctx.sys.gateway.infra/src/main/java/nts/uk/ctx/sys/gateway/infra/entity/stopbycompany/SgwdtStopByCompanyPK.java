package nts.uk.ctx.sys.gateway.infra.entity.stopbycompany;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 会社単位の利用停止の設定PK.
 * 
 * @author sonnlb
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class SgwdtStopByCompanyPK implements Serializable {
	private static final long serialVersionUID = 1L;

	/** 契約コード */
	@Column(name = "CONTRACT_CD")
	public String contractCd;

	/** 会社コード */
	@Column(name = "COMPANY_CD")
	public String companyCd;
}
