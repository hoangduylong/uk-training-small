package nts.uk.ctx.bs.employee.app.command.workplace.group;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class WorkplaceParam {
	/** 職場ID */
	private String wKPID;

	/** 職場コード */
	private String workplaceCode;

	/** 職場名称 */
	private String workplaceName;
}
