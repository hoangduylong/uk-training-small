package nts.uk.ctx.bs.employee.pub.jobtitle.affiliate;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 所属職位履歴項目 Export
 */
@Getter
@AllArgsConstructor
public class AffJobTitleHistoryItemExport {
    // 履歴ID
    private String historyId;

    /** The employee id. */
    // 社員ID
    private String employeeId;

    /** The job title id. */
    // 職位ID
    private String jobTitleId;

    /** The note. */
    // 備考
    private String note;
}
