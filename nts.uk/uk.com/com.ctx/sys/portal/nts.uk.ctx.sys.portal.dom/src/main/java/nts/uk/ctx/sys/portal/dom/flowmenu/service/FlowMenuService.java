package nts.uk.ctx.sys.portal.dom.flowmenu.service;

import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenu;

/**
 * @author HieuLT
 */
public interface FlowMenuService {

	/**
	 * Check FlowMenu is existed
	 * 
	 * @param
	 * @return True if existed
	 */
	boolean isExist(String companyID, String topPagePartId);

	/**
	 * Create FlowMenu
	 * 
	 * @param
	 */
	void createFlowMenu(FlowMenu flowMenu);

	/**
	 * Update FlowMenu
	 * 
	 * @param
	 */
	void updateFlowMenu(FlowMenu flowMenu);

	
	/**
	 * Delete FlowMenu
	 * 
	 * @param
	 */
	void deleteFlowMenu(String companyID, String topPagePartId);

	
}