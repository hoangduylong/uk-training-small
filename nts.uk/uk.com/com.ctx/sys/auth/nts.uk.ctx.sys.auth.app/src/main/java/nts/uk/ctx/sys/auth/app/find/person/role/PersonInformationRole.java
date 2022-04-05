package nts.uk.ctx.sys.auth.app.find.person.role;

import lombok.Data;
import nts.uk.ctx.sys.auth.dom.role.EmployeeReferenceRange;
import nts.uk.ctx.sys.auth.dom.role.RoleAtr;
import nts.uk.ctx.sys.auth.dom.role.RoleType;

@Data
public class PersonInformationRole {

	/** The role id. */
	// Id
	private String roleId;

	/** The role code. */
	// コード
	private String roleCode;

	/** The role type. */
	// ロール種類
	private RoleType roleType;

	/** The employee reference range. */
	// 参照範囲
	private EmployeeReferenceRange employeeReferenceRange;

	/** The name. */
	// ロール名称
	private String name;
	/** The assign atr. */
	// 担当区分
	private RoleAtr assignAtr;
	
	/** 未来日参照権限 */
	private Boolean referFutureDate;
}
