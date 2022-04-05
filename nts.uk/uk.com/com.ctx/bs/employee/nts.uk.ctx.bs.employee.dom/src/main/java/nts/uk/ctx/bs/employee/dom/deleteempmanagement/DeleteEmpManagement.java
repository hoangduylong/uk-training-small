package nts.uk.ctx.bs.employee.dom.deleteempmanagement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeleteEmpManagement extends AggregateRoot {

	/**
	 * domain : 社員一時削除管理
	 */
	/** 完全削除  */
	private int deleted;
	/** 社員ID */
	private String sid;
	/** 日時  */
	private GeneralDate deleteDate;
	/** 理由  */
	private ReasonRemoveEmp reasonRemoveEmp;

	public static DeleteEmpManagement creatFromJavaType(String sid, int deleted, GeneralDate dateTime,
			String reasonRemoveEmp) {
		return new DeleteEmpManagement(deleted, sid, dateTime, new ReasonRemoveEmp(reasonRemoveEmp));

	}

}
