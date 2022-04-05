package nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.standardmenu.MenuCode;

/**
 * スマホメニュー並び順
 * 
 * @author sonnh1
 *
 */
@Getter
public class SPMenuOrder extends AggregateRoot {
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * コード
	 */
	private MenuCode code;
	/**
	 * 並び順
	 */
	private int sortOrder;

	public SPMenuOrder(String companyId, MenuCode code, int sortOrder) {
		super();
		this.companyId = companyId;
		this.code = code;
		this.sortOrder = sortOrder;
	}

	public static SPMenuOrder createFromJavaType(String companyId, String code, int sortOrder) {
		return new SPMenuOrder(companyId, new MenuCode(code), sortOrder);
	}
}
