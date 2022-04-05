package nts.uk.ctx.bs.employee.pub.temporaryabsence;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

/**
 * @author Le Huu Dat
 */
@AllArgsConstructor
@Getter
public class TempAbsenceExport {
    private List<TempAbsenceHistoryExport> histories;
    private List<TempAbsenceHisItemExport> historyItem;
}
