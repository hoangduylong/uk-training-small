package nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * グループ会社共通マスタ
 * 
 * @author sonnlb
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "BSYMT_GPMASTER_CATEGORY")
public class BsymtGpMasterCategory extends UkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	// グループ会社共通マスタ PK
	@EmbeddedId
	private BsymtGpMasterCategoryPK pk;

	// 共通マスタコード
	@Column(name = "COMMON_MASTER_CD")
	private String commonMasterCode;

	// 共通マスタ名
	@Column(name = "COMMON_MASTER_NAME")
	private String commonMasterName;

	// 備考
	@Column(name = "COMMON_MASTER_REMARK")
	private String commonMasterMemo;

	@Override
	protected Object getKey() {
		return pk;
	}

}
