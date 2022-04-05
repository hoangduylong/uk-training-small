package nts.uk.ctx.sys.log.infra.entity.pereg;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SRCDT_PER_CTG_CORRECTION")
public class SrcdtPerCtgCorrection extends ContractUkJpaEntity {

	@Column(name = "CID")
	@Basic(optional = false)
	public String companyId;

	@Id
	@Column(name = "CTG_CORRECTION_LOG_ID")
	@Basic(optional = false)
	public String ctgCorrectionLogID;

	@Column(name = "PER_CORRECTION_LOG_ID")
	@Basic(optional = false)
	public String perCorrectionLogID;

	@Column(name = "CATEGORY_ID")
	@Basic(optional = true)
	public String categoryID;

	@Column(name = "CATEGORY_NAME")
	@Basic(optional = false)
	public String categoryName;

	@Column(name = "INFO_OPERATE_ATTR")
	@Basic(optional = false)
	public Integer infoOperateAttr;

	@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return ctgCorrectionLogID;
	}
}
