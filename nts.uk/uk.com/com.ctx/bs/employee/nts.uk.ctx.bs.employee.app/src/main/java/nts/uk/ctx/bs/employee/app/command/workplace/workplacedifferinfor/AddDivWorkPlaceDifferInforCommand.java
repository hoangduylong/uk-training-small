package nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddDivWorkPlaceDifferInforCommand {
	/**会社ID**/
	private String companyId;
	
	/** 職場登録区分 **/
	private int regWorkDiv;
	
}
