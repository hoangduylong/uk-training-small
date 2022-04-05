package nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
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
@Table(name = "BSYMT_GPMASTER_ITEM")
public class BsymtGpMasterItem extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	// 共通マスタID
	@Column(name = "COMMON_MASTER_ID")
	private String commonMasterId;

	@Id
	// 共通項目ID
	@Column(name = "COMMON_MASTER_ITEM_ID")
	private String commonMasterItemId;

	// 共通項目コード
	@Column(name = "COMMON_MASTER_ITEM_CD")
	private String commonMasterItemCode;

	// 共通項目名
	@Column(name = "COMMON_MASTER_ITEM_NAME")
	private String commonMasterItemName;

	// 表示順
	@Column(name = "DISP_NUM")
	private int displayNumber;

	// 使用開始日
	@Column(name = "USAGE_START_DATE")
	private GeneralDate usageStartDate;

	// 使用終了日
	@Column(name = "USAGE_END_DATE")
	private GeneralDate usageEndDate;

	@Override
	protected Object getKey() {
		return commonMasterItemId;
	}
}
