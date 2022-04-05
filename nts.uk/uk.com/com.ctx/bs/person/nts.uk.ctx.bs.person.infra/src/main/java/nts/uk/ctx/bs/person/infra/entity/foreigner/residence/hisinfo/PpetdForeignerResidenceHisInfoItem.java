/**
 * 
 */
package nts.uk.ctx.bs.person.infra.entity.foreigner.residence.hisinfo;

import java.io.Serializable;
import java.math.BigInteger;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateTimeToDBConverter;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "PPEDT_ZAIRYU_HIST_ITEM")
public class PpetdForeignerResidenceHisInfoItem extends ContractUkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public PpetdForeignerResidenceHisInfoItemPk key;

	// 個人ID
	@Basic(optional = true)
	@Column(name = "PID")
	public String pid;

	// 交付年月日
	@Basic(optional = true)
	@Column(name = "CARD_ST")
	@Convert(converter = GeneralDateTimeToDBConverter.class)
	public GeneralDateTime issueDate;

	// 在留資格ID
	@Basic(optional = true)
	@Column(name = "ZAIRYU_KBN_ID")
	public BigInteger statusOfResidenceID;

	// 在留資格コード
	@Basic(optional = true)
	@Column(name = "ZAIRYU_KBN_CD")
	public String statusOfResidenceCode;

	// 在留資格名称
	@Basic(optional = true)
	@Column(name = "ZAIRYU_KBN_NAME")
	public String statusOfResidenceName;

	// 在留期間ID
	@Basic(optional = true)
	@Column(name = "ZAIRYU_TERM_ID")
	public BigInteger periodOfStayID;

	// 在留期間コード
	@Basic(optional = true)
	@Column(name = "ZAIRYU_TERM_CD")
	public String periodOfStayCode;

	// 在留期間名称
	@Basic(optional = true)
	@Column(name = "ZAIRYU_TERM_NAME")
	public String periodOfStayName;

	// 在留許可番号
	@Basic(optional = true)
	@Column(name = "ZAIRYU_NO")
	public String numberResidencePermit;

	// 資格外活動許可
	@Basic(optional = true)
	@Column(name = "SIKAKUGAI_KBN")
	public Integer perUnqualifiedActivity;

	// 届出事業所外就労区分
	@Basic(optional = true)
	@Column(name = "JIGYOSYOGAI_KBN")
	public Integer reportWorkOutside;

	// 国籍ID
	@Basic(optional = true)
	@Column(name = "J_NATIO_ID")
	public BigInteger nationalityID;

	// 国籍コード
	@Basic(optional = true)
	@Column(name = "J_NATIO_CD")
	public String nationalityCode;

	// 国籍名称
	@Basic(optional = true)
	@Column(name = "J_NATIO_NAME")
	public String nationalityName;

	@Override
	protected Object getKey() {
		return key;
	}

}
