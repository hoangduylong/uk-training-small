package entity.workplacegroup;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.NoArgsConstructor;
import nts.arc.enums.EnumAdaptor;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupCode;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupName;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupType;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * 職場グループ
 *
 * @author phongtq
 *
 */

@Entity
@NoArgsConstructor
@Table(name = "BSYMT_WORKPLACE_GROUP")
public class BsymtWorkplaceGroup extends ContractUkJpaEntity {
	@EmbeddedId
	public BsymtWorkplaceGroupPk pk;

	/** 職場グループコード */
	@Basic(optional = false)
	@NotNull
	@Column(name = "CD")
	public String WKPGRPCode;

	/** 職場グループ名称 */
	@Basic(optional = false)
	@NotNull
	@Column(name = "NAME")
	public String WKPGRPName;

	/** 職場グループ種別 */
	@Basic(optional = false)
	@NotNull
	@Column(name = "WKPGRP_TYPE")
	public int WKPGRPType;

	@Override
	protected Object getKey() {
		return this.pk;
	}

	public BsymtWorkplaceGroup(BsymtWorkplaceGroupPk pk, String wKPGRPCode, String wKPGRPName, int wKPGRPType) {
		super();
		this.pk = pk;
		this.WKPGRPCode = wKPGRPCode;
		this.WKPGRPName = wKPGRPName;
		this.WKPGRPType = wKPGRPType;
	}

	public static BsymtWorkplaceGroup toEntity(WorkplaceGroup group) {
		// TODO Auto-generated method stub
		return new BsymtWorkplaceGroup(
				new BsymtWorkplaceGroupPk(group.getCID(), group.getId()),
				group.getCode().v(),
				group.getName().v(),
				group.getType().value);
	}

	public void fromEntity(WorkplaceGroup group) {
		BsymtWorkplaceGroupPk pk = new BsymtWorkplaceGroupPk(group.getCID(), group.getId());
		this.pk = pk;
		this.WKPGRPCode = group.getCode().v();
		this.WKPGRPName = group.getName().v();
		this.WKPGRPType = group.getType().value;
	}

	public WorkplaceGroup toDomain(){
		return new WorkplaceGroup(
				pk.CID,
				pk.WKPGRPID,
				new WorkplaceGroupCode(this.WKPGRPCode),
				new WorkplaceGroupName(this.WKPGRPName),
				EnumAdaptor.valueOf(this.WKPGRPType, WorkplaceGroupType.class));
	}
}
