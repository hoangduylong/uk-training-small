package nts.uk.ctx.bs.employee.app.query.hospitalofficeinfo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.time.GeneralDate;

@AllArgsConstructor
@Getter
public class HospitalBusinessOfficeInfoHistoryDto {

    private String workplaceGroupId;

    private String historyId;

    private GeneralDate startDate;

    private GeneralDate endDate;
}
