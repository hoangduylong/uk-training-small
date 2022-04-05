package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import java.util.List;
import java.util.Optional;

public interface CreateFlowMenuRepository {
	
	/**
	 * @param domain
	 */
	void insert(CreateFlowMenu domain);
	
	/**
	 * @param domain
	 */
	void update(CreateFlowMenu domain);
	
	/**
	 * @param domain
	 */
	void delete(CreateFlowMenu domain);
	
	/**
	 * @param cid
	 * @param flowMenuCode
	 * @return
	 */
	Optional<CreateFlowMenu> findByPk(String cid, String flowMenuCode);
	
	/**
	 * @param cid
	 * @return
	 */
	List<CreateFlowMenu> findByCid(String cid);
}
