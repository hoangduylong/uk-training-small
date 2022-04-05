package nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 社員の情報 imported
 */
@Data
@AllArgsConstructor
public class EmployeeInformationImport {
    /**
     * 社員ID
     */
    private String employeeId;

    /**
     * ログイン者が担当者か
     */
    private boolean isEmployeeCharge;

    /**
     * 職位名称
     */
    private String positionName;

    /**
     * 職場表示名
     */
    private String wkpDisplayName;
}
