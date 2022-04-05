package nts.uk.ctx.sys.env.app.find.sysusagesetfinder;

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
public class SysUsageSetDto {
	/**会社ID**/
	private String companyId;
	
	// 会社コード
	private String companyCode;
	
	/** 契約コード */
	private String contractCd;
	
	/** 人事システム **/
	private int jinji;
	/** 就業システム **/
	private int shugyo;
	/** 給与システム **/
	private int kyuyo;
	
}
