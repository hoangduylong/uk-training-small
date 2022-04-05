package nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * グループ会社共通マスタ項目
 * 
 * @author sonnlb
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "BSYMT_GPMASTER_NOTUSE")
public class BsymtGpMasterNotUse extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	// グループ会社共通マスタ項目 PK
	@EmbeddedId
	private BsymtGpMasterNotUsePK pk;

	@Override
	protected Object getKey() {
		return pk;
	}

}
