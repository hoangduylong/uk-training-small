package nts.uk.ctx.bs.employee.app.find.position.jobposition;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.ComboBoxObject;
import nts.uk.shr.pereg.app.PeregComboList;
import nts.uk.shr.pereg.app.PeregItem;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AffiDeptAndSubJobPos{
	/** The id. */
	@PeregItem("")
	private String id;

	/** The period. */
	@PeregItem("")
	private DatePeriod period;

	/** The employee id. */
	@PeregItem("")
	private String employeeId;

	/** The department id. */
	@PeregItem("")
	private String departmentId;
	
	@PeregComboList
	private List<ComboBoxObject> lstComboBoxJobPos;
}
