package nts.uk.ctx.bs.employee.dom.employee.mgndata;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.bs.employee.dom.employeeinfo.EmployeeCode;

@Getter
@Setter
@NoArgsConstructor
/** 社員データ管理情報 */
public class EmployeeDataMngInfo extends AggregateRoot {

	public EmployeeDataMngInfo(String companyId, String personId, String employeeId, EmployeeCode employeeCode,
			EmployeeDeletionAttr deletedStatus, GeneralDateTime deleteDateTemporary, RemoveReason removeReason,
			ExternalCode externalCode) {
		super();
		this.companyId = companyId;
		this.personId = personId;
		this.employeeId = employeeId;
		this.employeeCode = employeeCode;
		this.deletedStatus = deletedStatus;
		this.deleteDateTemporary = deleteDateTemporary;
		this.removeReason = removeReason;
		this.externalCode = externalCode;
	}
	/** 会社ID */
	private String companyId;

	/** 個人ID */
	private String personId;

	/** 社員ID */
	private String employeeId;

	/** 社員コード */
	private EmployeeCode employeeCode;

	/** 削除状況 */
	private EmployeeDeletionAttr deletedStatus;

	/** 一時削除日時 */
	private GeneralDateTime deleteDateTemporary;

	/** 削除理由 */
	private RemoveReason removeReason;

	/** 外部コード */
	private ExternalCode externalCode;
	
	public EmployeeDataMngInfo(String cId, String pId, String sId, String employeeCode, String externalCode){
		this.companyId = cId;
		this.personId = pId;
		this.employeeId = sId;
		this.employeeCode = new EmployeeCode(employeeCode);
		this.externalCode = externalCode == null? null: new ExternalCode(externalCode);
	}
	public static EmployeeDataMngInfo createFromJavaType(String cId, String pId, String sId, String sCd, int delStatus,
			GeneralDateTime delTemp, String removeReason, String extCode) {
		return new EmployeeDataMngInfo(cId, pId, sId, new EmployeeCode(sCd),
				EnumAdaptor.valueOf(delStatus, EmployeeDeletionAttr.class), delTemp, new RemoveReason(removeReason),
				extCode == null? null: new ExternalCode(extCode));
	}
}
