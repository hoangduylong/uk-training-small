package nts.uk.ctx.bs.employee.pub.classification;

import lombok.Getter;
import lombok.Setter;

/**
 * «Imported» 社員分類
 * path:UKDesign.ドメインモデル.NittsuSystem.UniversalK.就業.shared.就業規則.組織管理.社員情報.所属分類履歴.Imported.社員分類
 * @author HieuLt
 *
 */
@Getter
@Setter
public class EmpClassifiExport {
	
	/** 社員ID **/
	private String empID;
	/** 分類コード **/
	private String classificationCode;
	public EmpClassifiExport(String empID, String classificationCode) {
		super();
		this.empID = empID;
		this.classificationCode = classificationCode;
	}
	
}
