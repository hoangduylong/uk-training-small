package nts.uk.ctx.sys.portal.dom.toppagesetting;

import java.util.List;
import java.util.Optional;

/**
 * 
 * @author sonnh1
 *
 */
public interface TopPagePersonSetRepository {
	/**
	 * 
	 * @param companyId
	 * @param List<sId>
	 * @return list TopPagepersonSet
	 */
	List<TopPagePersonSet> findByListSid(String companyId, List<String> sId);

	/**
	 * added by Hoant
	 * 
	 * @param companyId
	 * @param employeeId
	 * @return
	 */
	Optional<TopPagePersonSet> getbyCode(String companyId, String employeeId);

	/**
	 * Update data in to table TOPPAGE_PERSON_SET
	 * 
	 * @param topPagePersonSet
	 */
	void update(TopPagePersonSet topPagePersonSet);

	/**
	 * Add data in to table TOPPAGE_PERSON_SET
	 * 
	 * @param topPagePersonSet
	 */
	void add(TopPagePersonSet topPagePersonSet);

	/**
	 * remove data in to table TOPPAGE_PERSON_SET
	 * 
	 * @param companyId
	 * @param Sid
	 */
	void remove(String companyId, String Sid);
}
