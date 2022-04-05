package nts.uk.ctx.sys.portal.app.find.toppagepart;

import javax.ejb.Stateless;

import nts.uk.ctx.sys.portal.app.find.placement.PlacementPartDto;

/**
 * @author LamDT
 */
@Stateless
public class PortalTopPagePartFinder {
	
	/**
	 * Find all TopPagePart and TopPagePartType
	 * @return ActiveTopPagePartDto
	 */
	public ActiveTopPagePartDto findAll(int pgType) {
		return null;
	}
	
	/** Find a PlacementPart with given ID */
	public PlacementPartDto findPlacementPartByID(String topPagePartID) {
		throw new RuntimeException("Can't find TopPagePart with id: " + topPagePartID);
	}
}