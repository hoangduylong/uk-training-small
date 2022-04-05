package nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * グループ会社共通マスタ項目 PK
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class BsymtGpMasterNotUsePK implements Serializable {

	private static final long serialVersionUID = 1L;

	// 共通項目ID
	@Column(name = "COMMON_MASTER_ITEM_ID")
	private String commonMasterItemId;

	// 会社ID
	@Column(name = "CID")
	private String companyId;

}
