package nts.uk.ctx.sys.portal.dom.webmenu.smartphonemenu;


import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.NoArgsConstructor;

import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.standardmenu.MenuCode;

/**
 * スマホメニューグループ
 * 
 * @author sonnh1
 *
 */
@Getter
@NoArgsConstructor
public class SPMenuGroup extends AggregateRoot {
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * コード
	 */
	private MenuCode code;
	/**
	 * 子メニューコード
	 */
	private List<MenuCode> childMenuCode;

	public SPMenuGroup(String companyId, MenuCode code, List<MenuCode> childMenuCode) {
		super();
		this.companyId = companyId;
		this.code = code;
		this.childMenuCode = childMenuCode;
	}
	
	public static SPMenuGroup createFromJavaType(String companyId, String code, List<String> childMenuCode) {
		return new SPMenuGroup(companyId, new MenuCode(code),
				childMenuCode.stream().map(x -> new MenuCode(x)).collect(Collectors.toList()));
	}

}
