package nts.uk.ctx.sys.portal.app.find.webmenu.webmenulinking;

import lombok.Data;
import nts.uk.ctx.sys.portal.dom.webmenu.webmenulinking.RoleSetLinkWebMenu;

@Data
public class RoleSetLinkWebMenuDto {
	
	/** �?社ID */
	private String companyId;

	/** メニューコードリスト */
	private String webMenuCd;

	/** ロールセットコード. */
	private String roleSetCd;

	/**
	 * Transfer data from Domain into Dto to response to client
	 * @param roleSet
	 * @return
	 */
	public static RoleSetLinkWebMenuDto build(RoleSetLinkWebMenu roleSetAndWebMenu) {
		RoleSetLinkWebMenuDto result = new RoleSetLinkWebMenuDto();
		result.setCompanyId(roleSetAndWebMenu.getCompanyId());
		result.setRoleSetCd(roleSetAndWebMenu.getRoleSetCd().v());
		result.setWebMenuCd(roleSetAndWebMenu.getWebMenuCd().v());
		return result;
	}
}
