package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StatusOfEmployeeExport {

	/** Status of Employee
	 *  True: Deleted (deletion situation = temporary deletion or complete deletion)
	 *	false: not deleted (deletion status = not deleted)
	 */
	private boolean deleted;
}
