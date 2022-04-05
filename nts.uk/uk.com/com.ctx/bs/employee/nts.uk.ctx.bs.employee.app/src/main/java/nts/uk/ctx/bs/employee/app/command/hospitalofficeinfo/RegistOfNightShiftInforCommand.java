package nts.uk.ctx.bs.employee.app.command.hospitalofficeinfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.NightShiftOperationRule;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.NursingCareEstablishmentInfo;

import java.util.Optional;

@AllArgsConstructor
@Getter
public class RegistOfNightShiftInforCommand {
    // 職場グループID: 職場グループID.
    private  String workplaceGroupId;
    // 履歴ID: .
    private  String historyId;
    // 夜勤運用ルール: 夜勤運用ルール.

    private int nightShiftOperationAtr;

    private Integer ClockHourMinuteStart; // HH:mm

    private Integer ClockHourMinuteEnd; // HH:mm

}
