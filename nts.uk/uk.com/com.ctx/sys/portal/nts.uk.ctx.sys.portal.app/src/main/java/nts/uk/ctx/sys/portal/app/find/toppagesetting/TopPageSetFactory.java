package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import nts.uk.ctx.sys.portal.dom.toppagesetting.PortalJobTitleImport;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageJobSet;
/**
 * 
 * @author hoatt
 *
 */
public interface TopPageSetFactory {
	
	/**
	 * get top page for position
	 * @param jobPosition
	 * @param topPageJob
	 * @return
	 */
	LayoutAllDto getTopPageForPosition(String fromScreen, PortalJobTitleImport jobPosition,TopPageJobSet topPageJob);
	/**
	 * get top page not position
	 * @param tpPerson
	 * @return
	 */
	LayoutAllDto getTopPageNotPosition(String fromScreen);
	/**
	 * check my page co duoc su dung khong
	 * @return
	 */
	boolean checkMyPageSet();
	/**
	 * check top page co duoc su dung hay khong
	 * @return
	 */
	boolean checkTopPageSet();
	/**
	 * find lay out my page
	 * @return
	 */
	LayoutForMyPageDto findLayoutMyPage();
}
