package nts.uk.ctx.sys.env.app.command.sysusagesetfinder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 * @author yennth
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddSysUsageSetCommand {
	/**会社ID**/
	private String companyId;
	
	/** 人事システム **/
	private int jinji;
	/** 就業システム **/
	private int shugyo;
	/** 給与システム **/
	private int kyuyo;
}
