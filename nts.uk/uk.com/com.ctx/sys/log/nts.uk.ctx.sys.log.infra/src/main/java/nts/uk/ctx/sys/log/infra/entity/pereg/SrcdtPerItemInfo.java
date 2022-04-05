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
@Table(name = "SRCDT_PER_ITEM_INFO")
public class SrcdtPerItemInfo extends ContractUkJpaEntity {

	@Column(name = "CID")
	@Basic(optional = false)
	public String companyId;

	@Id
	@Column(name = "ITEM_INFO_LOG_ID")
	@Basic(optional = false)
	public String itemInfoLogID;

	@Column(name = "CTG_CORRECTION_LOG_ID")
	@Basic(optional = false)
	public String ctgCorrectionLogID;

	@Column(name = "ITEM_ID")
	@Basic(optional = true)
	public String itemID;

	@Column(name = "ITEM_NAME")
	@Basic(optional = false)
	public String itemName;

	@Column(name = "DATA_VALUE_ATR")
	@Basic(optional = false)
	public Integer dataValueAttr;

	@Column(name = "VALUE_BEFORE")
	@Basic(optional = false)
	public String valueBefore;

	@Column(name = "CONTENT_BEFORE")
	@Basic(optional = false)
	public String contentBefore;

	@Column(name = "VALUE_AFTER")
	@Basic(optional = false)
	public String valueAfter;

	@Column(name = "CONTENT_AFTER")
	@Basic(optional = false)
	public String contentAfter;

	@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return itemInfoLogID;
	}

}
