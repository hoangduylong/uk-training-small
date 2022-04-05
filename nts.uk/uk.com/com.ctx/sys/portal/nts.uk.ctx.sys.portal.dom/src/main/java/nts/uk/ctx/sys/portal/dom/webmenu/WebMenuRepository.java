package nts.uk.ctx.sys.portal.dom.webmenu;

import java.util.List;
import java.util.Optional;

import nts.uk.ctx.sys.portal.dom.webmenu.valueobject.WebMenuSimple;


/**
 * 
 * @author sonnh
 *
 */
public interface WebMenuRepository {
	
	/**
	 * 
	 * @param companyId
	 * @return
	 */
	List<WebMenu> findAll(String companyId);
	
	/**
	 * Find default web menu.
	 * @param companyId companyId
	 * @return default menu
	 */
	Optional<WebMenu> findDefault(String companyId);
	
	/**
	 * Find a web menu
	 * @param companyId
	 * @return
	 */
	Optional<WebMenu> find(String companyId, String webMenuCode);
	
	/**
	 * Find web menus.
	 * @param companyId companyId
	 * @param webMenuCodes webMenuCodes
	 * @return web menu list
	 */
	List<WebMenu> find(String companyId, List<String> webMenuCodes);
	
	/**
	 * Find all simple web menus.
	 * @return list web menu simple value object
	 * @see WebMenuSimple
	 */
	List<WebMenuSimple> findAllSimpleValue(String companyId);
	
	/**
	 * add new a web menu
	 * @param webMenu
	 */
	void add(WebMenu webMenu);
	
	/**
	 * update information a web menu
	 * @param webMenu
	 */
	void update(WebMenu webMenu);
	
	/**
	 * remove a web menu
	 * @param companyId
	 * @param webMenuCode
	 */
	void remove(String companyId, String webMenuCode);

	
	/**
	 * Change all web menu to not default
	 * @param companyId
	 */
	void changeNotDefault(String companyId, String webMenuCode);
	
	/**
	 * Add by ThanhPV for CCG008
	 * Delete the "tree menu" associated with the domain model "Web Menu"
	 * 
	 * conditions:
	 * Web menu. Company ID ← Login company ID
	 * Tree menu. Menu classification ← Top page
	 * Tree menu. Code ← deleted top page code
	 */
	void removeTreeMenu(String companyId, int classification, String code);
}
