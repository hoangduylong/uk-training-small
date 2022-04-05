package nts.uk.ctx.bs.employee.app.find.wkpdep;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import nts.arc.time.GeneralDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepWkpInfoFindObject {

    /** The start mode (department or workplace). */
    private Integer startMode;

    /** The base date. */
    private GeneralDate baseDate;

    /** The system type. */
    private Integer systemType = 5;

    /** The restriction of reference range. */
    private Boolean restrictionOfReferenceRange;

}
