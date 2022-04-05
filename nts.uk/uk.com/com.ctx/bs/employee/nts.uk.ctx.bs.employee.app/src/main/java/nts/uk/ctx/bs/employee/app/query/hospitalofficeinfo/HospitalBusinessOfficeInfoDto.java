package nts.uk.ctx.bs.employee.app.query.hospitalofficeinfo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class HospitalBusinessOfficeInfoDto {
    // 職場グループID: 職場グループID.
    private String workplaceGroupId;
    // 履歴ID: .
    private String historyId;
    // 夜勤運用ルール: 夜勤運用ルール.

    private int nightShiftOperationAtr;

    private String ClockHourMinuteStart; // HH:mm

    private String ClockHourMinuteEnd; // HH:mm
}
