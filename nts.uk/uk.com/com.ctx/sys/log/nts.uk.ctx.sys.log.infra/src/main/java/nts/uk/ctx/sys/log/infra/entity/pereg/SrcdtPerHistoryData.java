package nts.uk.ctx.sys.log.infra.entity.pereg;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SRCDT_PER_HISTORY_DATA")
public class SrcdtPerHistoryData extends ContractUkJpaEntity {

	@Column(name = "CID")
	@Basic(optional = false)
	public String companyId;

	@Id
	@Column(name = "DATA_HISTORY_LOG_ID")
	@Basic(optional = false)
	public String dataHistoryLogID;

	@Column(name = "CTG_CORRECTION_LOG_ID")
	@Basic(optional = false)
	public String ctgCorrectionLogID;

	@Column(name = "STRING_KEY")
	@Basic(optional = true)
	public String stringKey;

	@Column(name = "TARGET_KEY_YMD")
	@Basic(optional = true)
	public GeneralDate targetKeyYMD;

	@Column(name = "TARGET_KEY_YM")
	@Basic(optional = true)
	public Integer targetKeyYM;

	@Column(name = "TARGET_KEY_Y")
	@Basic(optional = true)
	public Integer targetKeyY;

	@Column(name = "REVISE_ITEM_NAME")
	@Basic(optional = false)
	public String reviseItemName;

	@Column(name = "REVISE_YMD")
	@Basic(optional = true)
	public GeneralDate reviseYMD;

	@Column(name = "REVISE_YM")
	@Basic(optional = true)
	public Integer reviseYM;

	@Column(name = "REVISE_Y")
	@Basic(optional = true)
	public Integer reviseY;

	@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return dataHistoryLogID;
	}

}
