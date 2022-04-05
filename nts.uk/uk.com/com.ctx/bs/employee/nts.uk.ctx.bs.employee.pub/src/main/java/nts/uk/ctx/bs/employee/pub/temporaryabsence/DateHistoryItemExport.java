package nts.uk.ctx.bs.employee.pub.temporaryabsence;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@Getter
@AllArgsConstructor
public class DateHistoryItemExport {

    private String historyId;
    private GeneralDate startDate;
    private GeneralDate endDate;
}
