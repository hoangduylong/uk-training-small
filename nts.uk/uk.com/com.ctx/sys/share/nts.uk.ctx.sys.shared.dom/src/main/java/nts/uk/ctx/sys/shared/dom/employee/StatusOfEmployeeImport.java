package nts.uk.ctx.sys.shared.dom.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StatusOfEmployeeImport {

	/** Status of Employee
	 *  True: Deleted (deletion situation = temporary deletion or complete deletion)
	 *	false: not deleted (deletion status = not deleted)
	 */
	private boolean deleted;
}
