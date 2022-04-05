package nts.uk.ctx.sys.portal.pub.standardmenu;

import java.util.List;

public interface StandardMenuPub {

	// [No.675]メニューの表示名を取得する
	/**
	 * 
	 * @param companyId 会社ID
	 * @param  List<StandardMenuNameQuery> query
	 * @return List<StandardMenuNameExport>
	 */
	public List<StandardMenuNameExport> getMenuDisplayName(String companyId, List<StandardMenuNameQuery> query);

	List<StandardMenuNameExport> getMenus(String companyId, int system);
}
