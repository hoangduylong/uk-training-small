package nts.uk.ctx.sys.portal.dom.notice.adapter;

import lombok.Builder;
import lombok.Data;

/**
 * dto by RequestList 228
 *
 */
@Data
@Builder
public class EmployeeInfoImport {
	
	/** 社員ID */
	private String sid;

	/** 社員コード.Employee code */
	private String scd;

	/** ビジネスネーム.Business name */
	private String bussinessName;

}
