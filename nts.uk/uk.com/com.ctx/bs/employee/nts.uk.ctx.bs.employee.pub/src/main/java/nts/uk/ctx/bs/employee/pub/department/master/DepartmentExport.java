package nts.uk.ctx.bs.employee.pub.department.master;

import lombok.Builder;
import lombok.Getter;

import java.util.Optional;

// 部門
// for salary qmm016, 017
@Builder
@Getter
public class DepartmentExport {
    /** The company id. */
    // 会社ID
    private String companyId;

    /** The dep history id. */
    // 履歴ID
    private String depHistoryId;

    /** The department id. */
    // 部門ID
    private String departmentId;

    /** The department code. */
    // 部門コード
    private String departmentCode;

    /** The department name. */
    // 部門名称
    private String departmentName;

    // 部門表示名
    private String depDisplayName;

    /** The dep generic name. */
    // 部門総称
    private String depGenericName;

    /** The outside dep code. */
    // 部門外部コード
    private Optional<String> outsideDepCode;
}
