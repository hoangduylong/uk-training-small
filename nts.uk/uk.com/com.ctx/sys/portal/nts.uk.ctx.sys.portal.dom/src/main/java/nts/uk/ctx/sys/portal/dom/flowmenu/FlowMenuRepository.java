/**
 * author hieult
 */
package nts.uk.ctx.sys.portal.dom.flowmenu;

import java.util.List;
import java.util.Optional;

public interface FlowMenuRepository {

	/**
	 * Find All
	 * 
	 * @param companyID
	 * @return
	 */
	List<FlowMenu> findAll(String companyID);

	/**
	 * Find by code
	 * 
	 * @param companyID
	 * @param toppagePartID
	 * @return
	 */
	Optional<FlowMenu> findByCode(String companyID, String toppagePartID);
	
	/**
	 * Find all flow menu by list top page part id
	 * @param companyID
	 * @param toppagePartID
	 * @return
	 */
	List<FlowMenu> findByCodes(String companyID, List<String> toppagePartID);

	/**
	 * Add
	 * 
	 * @param flow
	 * 
	 */
	void add(FlowMenu flow);

	/**
	 * Update
	 * 
	 * @param companyID
	 * @param toppagePartID
	 */
	void update(FlowMenu flow);

	/**
	 * Remove
	 * 
	 * @param companyID
	 * @param toppagePartID
	 */
	void remove(String companyID, String toppagePartID);
	
	/**
	 * 
	 * @param companyID
	 * @param topPagePartID
	 * @param topPagePartType
	 * @return
	 */
	public Optional<FlowMenu> findByCodeAndType(String companyID, String topPagePartID, Integer topPagePartType);
	
	/**
	 * 
	 * @param companyID
	 * @param topPagePartType
	 * @return
	 */
	public List<FlowMenu> findByType(String companyID, Integer topPagePartType);
	
	/**
	 * 
	 * @param companyID
	 * @param code
	 * @param topPagePartType
	 * @return
	 */
	public Optional<FlowMenu> findByToppagePartCodeAndType(String companyID, String code, Integer topPagePartType);
	
}