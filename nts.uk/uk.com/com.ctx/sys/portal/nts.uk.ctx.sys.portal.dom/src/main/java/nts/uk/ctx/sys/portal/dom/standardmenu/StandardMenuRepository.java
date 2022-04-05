package nts.uk.ctx.sys.portal.dom.standardmenu;

import java.util.List;
import java.util.Optional;

import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;

/**
 * The Interface StandardMenuRepository.
 */
public interface StandardMenuRepository {
	/**
	 * Find all.
	 *
	 * @param companyId
	 *            the company id
	 * @return the list
	 */
	List<StandardMenu> findAll(String companyId);
	
	/**
	 * 
	 * @param companyId
	 * @return
	 */
	List<StandardMenu> findAll1(String companyId);

	/**
	 * added by sonnh1
	 * 
	 * find by COMPANYID and SYSTEM and MENU_CLASSIFICATION
	 * 
	 * @param companyId
	 * @param system
	 * @param menu_classification
	 * @return
	 */
	List<StandardMenu> findBySystemMenuClassification(String companyId, int system, int menu_classification);

	/**
	 * find by COMPANYID and MENU_CLASSIFICATION or AFTER_LOGIN_DISPLAY
	 * 
	 * @param companyId
	 * @param afterLoginDisplay
	 * @param menu_classification
	 * @return
	 */
	List<StandardMenu> findDataForAfterLoginDis(String companyId, int afterLoginDisplay, int menu_classification);

	/**
	 * find by COMPANYID and AFTER_LOGIN_DISPLAY
	 * 
	 * @param companyId
	 * @param afterLoginDisplay
	 * @return
	 */
	List<StandardMenu> findByAfterLoginDisplay(String companyId, int afterLoginDisplay);

	/**
	 * Find all.
	 *
	 * @param companyId
	 *            the company id
	 * @param webMenuSetting
	 * @param menuAtr
	 * @return the list
	 */
	List<StandardMenu> findByAtr(String companyId, int webMenuSetting, int menuAtr);

	/**
	 * hoatt get standard menu
	 * 
	 * @param companyId
	 * @param code
	 * @param system
	 * @param classification
	 * @return
	 */
	Optional<StandardMenu> getStandardMenubyCode(String companyId, String code, int system, int classification);

	/**
	 * Find standard menus.
	 * @param keys
	 * @return menu list
	 */
	List<StandardMenu> find(List<StandardMenuKey> keys);
	
	/**
	 * yennth
	 * 
	 * @param List
	 *            StandardMenu
	 */
	void changeName(List<StandardMenu> StandardMenu);

	/**
	 * Find all by system.
	 *
	 * @param companyId
	 *            the company id
	 * @param system
	 * @return the list
	 */
	List<StandardMenu> findBySystem(String companyId, int system);

	/**
	 * yennth
	 * 
	 * @param companyId
	 * @param code
	 * @param system
	 * @param classification
	 * @param displayName
	 * @return
	 */
	boolean isExistDisplayName(List<StandardMenu> StandardMenu);

	/**
	 * Find all menu with condition=DISPLAY
	 * 
	 * @param companyID
	 * @return
	 */
	List<StandardMenu> findAllDisplay(String companyID);

	/**
	 * Get program.
	 * 
	 * @param companyId
	 *            companyId
	 * @param programId
	 *            programId
	 * @param screenId
	 *            screenId
	 * @return standard menu
	 */
	List<StandardMenu> getProgram(String companyId, String programId, String screenId);
	
	/**
	 * ThanhPV
	 * insert StandardMenu
	 * @param standardMenu
	 */
	void insertStandardMenu(StandardMenu standardMenu);
	
	/**
	 * ThanhPV
	 * Update StandardMenu
	 * @param standardMenu
	 */
	void updateStandardMenu(StandardMenu standardMenu);
	/**
	 * ThanhPV
	 * delete StandardMenu
	 * @param standardMenu
	 */
	void deleteStandardMenu(String companyId, String code, int system, int classification);
	/**
	 * ThanhPV
	 * get Max Order StandardMenu
	 * @param standardMenu
	 */
	int maxOrderStandardMenu(String companyId, int system, int classification);
	
	Optional<StandardMenu> getPgName(String companyId, String programId, String screenId, String queryString);
	
	List<StandardMenu> findByCIDMobileCode(String companyID, List<String> codeLst);

	Optional<StandardMenu> getMenuDisplayNameHasQuery(String companyId, String programId, String queryString, String screenId);

	Optional<StandardMenu> getMenuDisplayNameNoQuery(String companyId, String programId, String screenId);

	List<StandardMenu> findByProgram(String companyId, int system, List<MenuClassification> classifications, List<String> programIds, String screenId);
	
	List<StandardMenu> findByMenuAndWebMenuDisplay(String cid, int classification, int menuAtr, int webSetting);
	
	Optional<StandardMenu> findByCIDSystemMenuClassificationCode(String cid, int system, int classification, String code);
	
	Optional<String> getUrl(String cid, int system, int menuClassfication, String programId, String screenId);
}
