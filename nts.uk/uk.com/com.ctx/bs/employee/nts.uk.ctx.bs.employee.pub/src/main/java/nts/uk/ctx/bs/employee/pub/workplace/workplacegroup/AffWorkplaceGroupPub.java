package nts.uk.ctx.bs.employee.pub.workplace.workplacegroup;

import java.util.List;

/**
 * The Interface AffWorkplaceGroupPub.
 */
public interface AffWorkplaceGroupPub {

	/**
	 * Find by cid and WkpIds.
	 */
	List<AffWorkplaceGroupExport> getByListWkpIds(String cid, List<String> wkpIds);

}
