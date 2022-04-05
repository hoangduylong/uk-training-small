package nts.uk.ctx.sys.log.infra.entity.reference;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.log.dom.reference.LogSetItemDetail;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/*
 * author: hiep.th
 */
@Entity
@Table(name = "SRCMT_DISPLAY_SET_DETAIL")
@NoArgsConstructor
@AllArgsConstructor
public class SrcmtDisplaySetDetail extends ContractUkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public SrcdtLogSetItemDetailPK srcdtLogSetItemDetailPK;
	
	/** 条件  */
	@Basic(optional=false)
	@Column(name = "CONDITION")
    public String condition;

	/** 記号 */
	@Basic(optional = false)
	@Column(name = "SYMBOL")
	private Integer symbol;
	
	/**
	 * 会社ID
	 */
	@Basic(optional=false)
	@Column(name = "CID")
    public String cid;

	@ManyToOne
	@JoinColumns(value={
			@JoinColumn(name="LOG_SET_ID", referencedColumnName="LOG_SET_ID", insertable = false, updatable = false),
			@JoinColumn(name="ITEM_NO", referencedColumnName="ITEM_NO", insertable = false, updatable = false)
		})
	public SrcmtDisplayOutputItem logSetOutputItemCond;

	@Override
	protected Object getKey() {
		return srcdtLogSetItemDetailPK;
	}

	public LogSetItemDetail toDomain() {
		return LogSetItemDetail.createFromJavatype(this.srcdtLogSetItemDetailPK.logSetId,
				this.srcdtLogSetItemDetailPK.itemNo, this.srcdtLogSetItemDetailPK.frame,
				this.condition, this.symbol, this.cid);
	}

	public static SrcmtDisplaySetDetail toEntity(LogSetItemDetail domain) {
		return new SrcmtDisplaySetDetail(new SrcdtLogSetItemDetailPK(domain.getLogSetId(), domain.getItemNo(), domain.getFrame()),
				domain.getCondition().v(), domain.getSymbol().code, domain.getCid());
	}

	public SrcmtDisplaySetDetail(SrcdtLogSetItemDetailPK srcdtLogSetItemDetailPK, String condition,
			int symbol, String cid) {
		super();
		this.srcdtLogSetItemDetailPK = srcdtLogSetItemDetailPK;
		this.condition = condition;
		this.symbol = symbol;
		this.cid = cid;
	}
}
