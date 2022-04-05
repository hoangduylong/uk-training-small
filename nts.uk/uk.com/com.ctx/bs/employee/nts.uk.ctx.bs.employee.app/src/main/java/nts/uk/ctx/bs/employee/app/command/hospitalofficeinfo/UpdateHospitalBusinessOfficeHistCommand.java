package nts.uk.ctx.bs.employee.app.command.hospitalofficeinfo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.time.GeneralDate;

@AllArgsConstructor
@Getter
public class UpdateHospitalBusinessOfficeHistCommand {
    private String startDate;
    private String workplaceGroupId;
    private String historyId;
    public GeneralDate toDate() {
        return GeneralDate.fromString(startDate, "yyyy/MM/dd");
    }

}
