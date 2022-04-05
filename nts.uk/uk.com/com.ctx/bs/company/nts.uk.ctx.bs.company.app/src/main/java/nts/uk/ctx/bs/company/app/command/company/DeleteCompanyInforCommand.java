package nts.uk.ctx.bs.company.app.command.company;

import lombok.Data;
/**
 * delete company command
 * @author yennth
 */
@Data
public class DeleteCompanyInforCommand {
	// 会社ID
	private String companyId;
	// 会社コード
	private String companyCode;
}
