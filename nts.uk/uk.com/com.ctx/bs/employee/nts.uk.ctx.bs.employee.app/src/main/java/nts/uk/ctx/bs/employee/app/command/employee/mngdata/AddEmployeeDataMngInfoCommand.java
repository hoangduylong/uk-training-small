package nts.uk.ctx.bs.employee.app.command.employee.mngdata;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;
@Getter
public class AddEmployeeDataMngInfoCommand{
	/** 個人ID */
	@PeregPersonId
	private String personId;

	/** 社員ID */
	@PeregEmployeeId
	private String employeeId;

	/** 社員コード */
	@PeregItem("IS00001")
	private String employeeCode;

	/** 外部コード */
	@PeregItem("IS00002")
	private String externalCode;
}
