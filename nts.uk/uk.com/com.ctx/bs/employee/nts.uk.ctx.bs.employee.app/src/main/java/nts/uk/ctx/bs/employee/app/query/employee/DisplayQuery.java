/**
 * 
 */
package nts.uk.ctx.bs.employee.app.query.employee;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * @author hieult
 *
 */
@Getter
@Setter
public class DisplayQuery {
	private GeneralDate baseDate;
	private List<String> listWorkplaceID;
}
