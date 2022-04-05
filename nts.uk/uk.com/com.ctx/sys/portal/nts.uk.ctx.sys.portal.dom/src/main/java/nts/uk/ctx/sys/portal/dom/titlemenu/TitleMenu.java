/**
 * author hieult
 */
package nts.uk.ctx.sys.portal.dom.titlemenu;

import lombok.EqualsAndHashCode;

import lombok.Value;
import nts.arc.layer.dom.AggregateRoot;

@Value
@EqualsAndHashCode(callSuper = false)
public class TitleMenu extends AggregateRoot {
	/** Company ID */
	private final String companyID;

	/** TitleMenuCD */
	private TitleMenuCD titleMenuCD;
	
	/** TitleMenuName */
	private Name name;
	
	/** LayoutID */
	private String layoutID;

	public static TitleMenu createFromJavaType(String companyID, String titleMenuCD, String name, String layoutID) {
		return new TitleMenu(companyID, new TitleMenuCD(titleMenuCD), new Name(name), layoutID);
	}
}