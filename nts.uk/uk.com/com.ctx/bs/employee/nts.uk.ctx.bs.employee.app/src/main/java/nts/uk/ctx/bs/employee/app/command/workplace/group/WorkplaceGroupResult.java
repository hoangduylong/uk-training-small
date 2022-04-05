package nts.uk.ctx.bs.employee.app.command.workplace.group;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WorkplaceGroupResult {

	/** 職場グループID */
	private String WKPGRPID;
	
	/** 職場グループコード */
	private String WKPGRPCode;
	
	/** 職場グループ名称 */
	private String WKPGRPName;
	
	
	
}
