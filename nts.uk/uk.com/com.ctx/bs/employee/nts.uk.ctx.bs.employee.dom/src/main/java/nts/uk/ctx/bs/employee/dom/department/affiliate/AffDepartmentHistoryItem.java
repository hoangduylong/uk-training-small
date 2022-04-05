package nts.uk.ctx.bs.employee.dom.department.affiliate;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * The Class AffDepartmentHistoryItem.
 */
// 所属部門履歴項目
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AffDepartmentHistoryItem extends AggregateRoot {

	/** The history Id. */
	// 履歴ID
	private String historyId;

	/** The Employee Id. */
	// 社員ID
	private String employeeId;

	/** The department code. */
	/* 部門コード */
	private String departmentId;

	/** The Affiliation History Transfer type. */
	// 所属履歴異動種類
	private String affHistoryTranfsType;

	// 分配率
	private DistributionRatio distributionRatio;
	
	public static AffDepartmentHistoryItem createFromJavaType(String histId, String sId, String departmentId, String affHistTranfsType, BigDecimal distributionRatio){
		return new AffDepartmentHistoryItem(histId,sId, departmentId, affHistTranfsType, new DistributionRatio(distributionRatio));
	}

}
