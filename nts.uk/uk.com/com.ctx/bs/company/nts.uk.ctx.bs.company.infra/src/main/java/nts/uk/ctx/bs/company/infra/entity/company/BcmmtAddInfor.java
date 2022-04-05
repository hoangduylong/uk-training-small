package nts.uk.ctx.bs.company.infra.entity.company;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BCMMT_ADDRESS")
public class BcmmtAddInfor extends ContractUkJpaEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	@EmbeddedId
	public BcmmtAddInforPK bcmmtAddInforPK;
	
	/** FAX番号*/
	@Column(name = "FAX_NUM")
	public String faxNum;
	
	/** 住所１ */
	@Column(name = "ADDRESS_1")
	public String add_1;

	/** 住所２ */
	@Column(name = "ADDRESS_2")
	public String add_2;
	
	/**  住所カナ１ */
	@Column(name = "KNNAME_1")
	public String addKana_1;
	
	/** 住所カナ２ */
	@Column(name = "KNNAME_2")
	public String addKana_2;
	
	/** 郵便番号 */
	@Column(name = "POSTAL_CODE")
	public String postCd;
	
	/** 電話番号 */
	@Column(name = "PHONE_NUMBER")
	public String phoneNum;
	
	@OneToOne
	@JoinColumn(name = "CID", referencedColumnName = "CID", insertable = false, updatable = false)
	public BcmmtCompanyInfor bcmmtCompanyInfor;
	
	@Override
	protected Object getKey() {
		return bcmmtAddInforPK;
	}
}
