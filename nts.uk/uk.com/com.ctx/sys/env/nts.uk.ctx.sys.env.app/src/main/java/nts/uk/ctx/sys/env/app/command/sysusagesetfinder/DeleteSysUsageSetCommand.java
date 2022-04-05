package nts.uk.ctx.sys.env.app.command.sysusagesetfinder;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 
 * @author yennth
 *
 */
@Data
@AllArgsConstructor
public class DeleteSysUsageSetCommand {
	/**会社ID**/
	private String companyId;
	
	// 会社コード
	private String companyCode;
	
	/** 契約コード */
	private String contractCd;
}
