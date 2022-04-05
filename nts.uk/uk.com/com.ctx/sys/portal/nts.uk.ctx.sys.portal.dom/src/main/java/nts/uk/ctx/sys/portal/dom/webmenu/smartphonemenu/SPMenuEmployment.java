package nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.standardmenu.MenuCode;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * スマホメニュー（就業）
 * 
 * @author sonnh1
 *
 */
@Getter
public class SPMenuEmployment extends AggregateRoot {
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * 就業ロール
	 */
	private String employmentRole;
	/**
	 * メニューコード
	 */
	private MenuCode menuCode;
	/**
	 * 表示区分
	 */
	private NotUseAtr displayAtr;

	public SPMenuEmployment(String companyId, String employmentRole, MenuCode menuCode, NotUseAtr displayAtr) {
		super();
		this.companyId = companyId;
		this.employmentRole = employmentRole;
		this.menuCode = menuCode;
		this.displayAtr = displayAtr;
	}

	public static SPMenuEmployment createFromJavaType(String companyId, String employmentRole, String menuCode,
			int displayAtr) {
		return new SPMenuEmployment(companyId, employmentRole, new MenuCode(menuCode),
				EnumAdaptor.valueOf(displayAtr, NotUseAtr.class));
	}

}
