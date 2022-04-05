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
public class UpdateSysUsageSetCommand {
	// 会社コード
	private String companyId;
	/** 人事システム **/
	private int jinji;
	/** 就業システム **/
	private int shugyo;
	/** 給与システム **/
	private int kyuyo;
}
