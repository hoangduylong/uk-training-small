package nts.uk.ctx.bs.employee.app.command.department;

import java.math.BigDecimal;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class AddAffiliationDepartmentCommand{
	/** The history Id. */
	// 履歴ID
	@PeregRecordId
	private String historyId;

	/** The Employee Id. */
	// 社員ID
	@PeregEmployeeId
	private String employeeId;

	/** The department code. */
	/* 部門コード */
	@PeregItem("IS00073")
	private String departmentId;

	/** The Affiliation History Transfer type. */
	// 所属履歴異動種類
	@PeregItem("IS00074")
	private String affHistoryTranfsType;

	// 分配率
	@PeregItem("IS00075")
	private BigDecimal distributionRatio;
	
	/** The period. */
	@PeregItem("IS00071")
	private GeneralDate startDate;
	
	@PeregItem("IS00072")
	private GeneralDate endDate;
}
