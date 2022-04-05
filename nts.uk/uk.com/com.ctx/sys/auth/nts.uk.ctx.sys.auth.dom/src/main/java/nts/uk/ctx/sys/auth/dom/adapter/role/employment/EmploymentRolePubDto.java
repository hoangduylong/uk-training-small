package nts.uk.ctx.sys.auth.dom.adapter.role.employment;

import lombok.Value;

@Value
public class EmploymentRolePubDto {
    /**
     * 会社ID
     */
    private String companyId;
    /**
     * ロールID
     */
    private String roleId;
    /**
     * スケジュール画面社員参照
     */
    private int scheduleEmployeeRef;
    /**
     * 予約画面社員参照
     */
    private int bookEmployeeRef;
    /**
     * 代行者指定時社員参照
     */
    private  int employeeRefSpecAgent;
    /**
     * 在席照会社員参照
     */
    private int presentInqEmployeeRef;
    /**
     * 未来日参照許可 FUTURE_DATE_REF_PERMIT
     */
    private int futureDateRefPermit;


}
