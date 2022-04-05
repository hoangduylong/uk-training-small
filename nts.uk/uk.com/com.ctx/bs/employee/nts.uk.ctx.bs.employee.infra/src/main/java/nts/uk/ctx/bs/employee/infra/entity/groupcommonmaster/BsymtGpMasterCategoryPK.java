package nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * グループ会社共通マスタ PK
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class BsymtGpMasterCategoryPK implements Serializable {

	private static final long serialVersionUID = 1L;

	// 共通マスタID
	@Column(name = "COMMON_MASTER_ID")
	private String commonMasterId;

	// 契約コード
	@Column(name = "CONTRACT_CD")
	private String contractCode;
}
