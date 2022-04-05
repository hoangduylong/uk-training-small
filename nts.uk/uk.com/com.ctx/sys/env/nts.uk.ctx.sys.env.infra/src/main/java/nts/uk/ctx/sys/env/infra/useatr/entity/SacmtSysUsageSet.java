package nts.uk.ctx.sys.env.infra.useatr.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SEVMT_SYSTEM_USE")
public class SacmtSysUsageSet extends ContractUkJpaEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	@EmbeddedId
	public SacmtSysUsageSetPK sacmtSysUsageSetPK;
	/** 人事システム */
	@Column(name = "JINJI_ATR")
	public int jinji;
	
	/** 就業システム */
	@Column(name = "SHUGYO_ATR")
	public int shugyo;
	
	/** 給与システム */
	@Column(name = "KYUYO_ATR")
	public int kyuyo;

	@Override
	protected Object getKey() {
		return sacmtSysUsageSetPK;
	}
	
	public SacmtSysUsageSet( SacmtSysUsageSetPK sacmtSysUsageSetPK){
		super();
		this.sacmtSysUsageSetPK = sacmtSysUsageSetPK;
	}
}
