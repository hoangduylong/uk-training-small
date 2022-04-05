package nts.uk.ctx.sys.portal.dom.placement.service;

/**
 * @author LamDT
 */
public interface PlacementService {

	/**
	 * Check Layout is existed
	 * 
	 * @param
	 * @return True if existed
	 */
	boolean isExist(String placementID);
	

	/**
	 * Copy Placement with given ID to Target Layout
	 * 
	 * @param
	 * @return Copied placement ID
	 */
	String copyPlacement(String placementID, String targetLayoutID);

	/**
	 * Delete List Placement by Layout
	 * 
	 * @param
	 */
	void deletePlacementByLayout(String companyID, String layoutID);
	
	/**
	 * Delete List Placement by TopPagePart
	 * 
	 * @param
	 */
	void deletePlacementByTopPagePart(String companyID, String topPagePartID);
	
}