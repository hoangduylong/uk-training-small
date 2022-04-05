package nts.uk.ctx.sys.portal.dom.placement;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import nts.uk.ctx.sys.portal.dom.placement.Placement;

/**
 * @author LamDT
 */
public interface PlacementRepository {
	
	/**
	 * Find a Placement
	 *
	 * @param placementID
	 * @return Optional Placement
	 */
	Optional<Placement> find(String placementID);

	/**
	 * Find Placement by Layout
	 *
	 * @param layoutID
	 * @return List Placement
	 */
	List<Placement> findByLayout(String layoutID);

	/**
	 * Find Placement by Layout
	 *
	 * @param topPagePartID
	 * @return List Placement
	 */
	List<Placement> findByTopPagePart(String topPagePartID);
	
	/**
	 * Remove a Placement
	 *
	 * @param companyID
	 * @param placementID
	 */
	void remove(String companyID, String placementID);

	/**
	 * Remove all Placement
	 *
	 * @param companyID
	 * @param placementID
	 */
	void removeAll(String companyID, List<String> placementIDs);
	
	/**
	 * Add a Placement
	 *
	 * @param placement
	 */
	void add(Placement placement);
	
	/**
	 * Add Collection&lt;Placement&gt;
	 *
	 * @param placements
	 */
	void addAll(Collection<Placement> placements);

	/**
	 * update a Placement
	 *
	 * @param placement
	 */
	void update(Placement placement);

}
