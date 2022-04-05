package nts.uk.ctx.sys.auth.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpWithRangeLogin {

	/** ビジネスネーム */
	private String businessName;
	/** 会社ID */
	private String companyID;
	/** 個人ID */
	private String personID;
	/** 社員コード */
	private String employeeCD;
	/** 社員ID */
	private String employeeID;

}
