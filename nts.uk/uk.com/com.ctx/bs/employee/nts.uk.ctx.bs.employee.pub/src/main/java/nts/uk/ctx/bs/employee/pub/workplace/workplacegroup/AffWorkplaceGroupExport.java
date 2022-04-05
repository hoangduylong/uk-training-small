package nts.uk.ctx.bs.employee.pub.workplace.workplacegroup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AffWorkplaceGroupExport {

	/** 職場グループID */
	private String WKPGRPID;

	/** 職場ID */
	private String WKPID;

}
