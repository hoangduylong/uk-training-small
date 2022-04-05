package nts.uk.ctx.sys.portal.dom.toppagesetting;

import java.util.List;

/**
 * 
 * @author sonnh1
 *
 */
public interface TopPageJobSetRepository {

	/**
	 * find by list jobId
	 * 
	 * @param companyId
	 * @param jobId
	 * @return
	 */
	List<TopPageJobSet> findByListJobId(String companyId, List<String> jobId);

	/**
	 * Insert into table TOPPAGE_JOB_SET
	 * 
	 * @param topPageJobSet
	 */
	void add(TopPageJobSet topPageJobSet);

	/**
	 * update data in table TOPPAGE_JOB_SET
	 * 
	 * @param topPageJobSet
	 */
	void update(TopPageJobSet topPageJobSet);

	/**
	 * update property in table TOPPAGE_JOB_SET with loginMenuCd = topMenuCd
	 * 
	 * @param topPageJobSet
	 */
	void updateProperty(TopPageJobSet topPageJobSet);
	
	/**
	 * Add by ThanhPV when remove top page in CCG015
	 * 
	 * Remove top page code selected in top page job set
	 * 
	 *  
	 * */
	void removeTopPageCode(String companyID, String code); 

}
