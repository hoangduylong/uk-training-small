package nts.uk.ctx.sys.auth.dom.export.wkpmanager;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleEmploymentExportData {
    /** The role id. */
    // Id
    private String roleId;

    /** The role code. */
    // コード
    private String roleCode;

    /** The role type. */
    // ロール種類
    private int roleType;

    /** The employee reference range. */
    // 参照範囲
    private int employeeReferenceRange;
    /**
     * 未来日参照許可 FUTURE_DATE_REF_PERMIT
     */
    private int futureDateRefPermit;
    /** Webメニュー名称 */
    private String webMenuName;
    /**
     * スケジュール画面社員参照
     */
    private int scheduleEmployeeRef;
    /**
     * 利用できる
     */
    private boolean availability;

}
