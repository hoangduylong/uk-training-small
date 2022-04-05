package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSet;

/**
 * 
 * @author sonnh1
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopPagePersonSetCommandBase {
	/* property categorySet of table TOPPAGE_SET */
	private int ctgSet;
	/* employee id */
	private String sId;
	private String topMenuCode;
	private String loginMenuCode;
	private int loginSystem;
	private int loginMenuCls;

	public TopPagePersonSet toDomain(String companyId) {
		TopPagePersonSet domain = TopPagePersonSet.createFromJavaType(companyId, this.sId, this.topMenuCode,
				this.loginMenuCode, this.loginSystem, this.loginMenuCls);
		return domain;
	}
}
