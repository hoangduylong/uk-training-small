package nts.uk.ctx.sys.shared.dom.employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.bs.employee.pub.employee.EmployeeDataMngInfoExport;

/**
 * 
 * 社員データ管理情報 <Imported>
 *
 */
@Data
@AllArgsConstructor
public class EmployeeDataMngInfoImport {

	/** 会社ID */
	private String companyId;

	/** 個人ID */
	private String personId;

	/** 社員ID */
	private String employeeId;

	/** 社員コード */
	private String employeeCode;

	/** 削除状況 */
	private SDelAtr deletedStatus;

	/** 一時削除日時 */
	private GeneralDateTime deleteDateTemporary;

	/** 削除理由 */
	private String removeReason;

	/** 外部コード */
	private String externalCode;
	
	public static EmployeeDataMngInfoImport of(EmployeeDataMngInfoExport export) {
		return new EmployeeDataMngInfoImport(
				export.getCompanyId(),
				export.getPersonId(),
				export.getEmployeeId(),
				export.getEmployeeCode(),
				SDelAtr.valueOf(export.getDeletedStatus()),
				export.getDeleteDateTemporary(),
				export.getRemoveReason(),
				export.getExternalCode());
	}
	
	/**
	 * 削除されているか
	 * @return
	 */
	public boolean isDeleted() {
		return deletedStatus == SDelAtr.DELETED;
	}
	
}
