package nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor;

import lombok.Data;
/**
 * delete a item
 * @author yennth
 */
@Data
public class DeleteDivWorkPlaceDifferInforCommand {
	/**会社ID**/
	private String companyId;
	
	// 会社コード
	private String companyCode;
	
	/** 契約コード */
	private String contractCd;
}
