package nts.uk.ctx.sys.portal.dom.notice.adapter;

import lombok.Builder;
import lombok.Data;

/**
 * Class RoleImport
 */
@Data
@Builder
public class RoleImport {
	
	/** The company Id. */
	private String companyId;

	/** The role id. */
	private String roleId;

	/** The role code. */
	private String roleCode;

	/** The role name. */
	private String roleName;
	
	/** The assign atr. */
	private Integer assignAtr; 
	
	private Integer employeeReferenceRange;
}
