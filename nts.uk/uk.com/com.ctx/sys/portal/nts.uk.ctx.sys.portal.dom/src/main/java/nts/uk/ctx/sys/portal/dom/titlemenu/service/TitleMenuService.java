package nts.uk.ctx.sys.portal.dom.titlemenu.service;

import nts.uk.ctx.sys.portal.dom.titlemenu.TitleMenu;

public interface TitleMenuService {
	
	boolean isExist(String companyID, String titleMenuCD);
	
	void deleteTitleMenu(String companyID, String titleMenuCD);
	
	void copyTitleMenu(String companyID, String sourceTitleMenuCD, String targetTitleMenuCD, String targetTitleMenuName, Boolean overwrite);
	
	void createTitleMenu(TitleMenu titleMenu);
}