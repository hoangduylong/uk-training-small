package nts.uk.ctx.bs.employee.pub.workplace.workplacegroup;

import java.util.Optional;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 社員の所属組織Exported
 * @author HieuLt
 *
 */
@Getter
@RequiredArgsConstructor
public class EmpOrganizationExport {
	/** 社員ID **/
	private final String empId;
	/** 社員コード **/
	private final Optional<String> empCd;
	/** ビジネスネーム**/
	private final Optional<String> businessName;
	/**職場ID **/
	private final String workplaceId;
	/**職場グループID **/
	private final Optional<String> workplaceGroupId;
}
