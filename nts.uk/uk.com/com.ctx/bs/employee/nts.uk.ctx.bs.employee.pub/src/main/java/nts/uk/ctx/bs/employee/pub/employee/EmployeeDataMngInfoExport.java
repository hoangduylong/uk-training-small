package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDateTime;

//社員データ管理情報 <export>
@Data
@Builder
@AllArgsConstructor
public class EmployeeDataMngInfoExport {

	/** 会社ID */
	private String companyId;

	/** 個人ID */
	private String personId;

	/** 社員ID */
	private String employeeId;

	/** 社員コード */
	private String employeeCode;

	/** 削除状況 */
	private int deletedStatus;

	/** 一時削除日時 */
	private GeneralDateTime deleteDateTemporary;

	/** 削除理由 */
	private String removeReason;

	/** 外部コード */
	private String externalCode;
}
