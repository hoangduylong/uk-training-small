package nts.uk.ctx.bs.employee.app.command.hospitalofficeinfo;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DeleteHospitalBusinessOfficeHistCommand {
    private String workplaceGroupId;
    private String historyId;
}
