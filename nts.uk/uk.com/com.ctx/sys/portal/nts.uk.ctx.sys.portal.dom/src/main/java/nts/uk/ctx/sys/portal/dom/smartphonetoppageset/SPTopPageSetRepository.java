package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;

import java.util.List;
import java.util.Optional;

/**
 * 
 * @author sonnh1
 *
 */
public interface SPTopPageSetRepository {
	
	List<SPTopPageSet> findAll(String companyID);
	Optional<NotificationDetailSet> findNotifi(String companyID);
	Optional<TimeStatusDetailsSet> findTimeStatus();
	Optional<TimeStatusDetailsSet> findAllTimeStatusDetailsSet(String companyID);
	public SPTopPageSet getTopPageSetByCompanyAndType(String companyId, int value);

	/**
	 * Top Page Setting
	 */

	public List<SPTopPageSet> getTopPageSet(String companyId, int system);

	void update(List<SPTopPageSet> lstSPTopPageSet);


	/**
	 * Top Page Detail
	 */

	void updateNoti(NotificationDetailSet domain);

	void updateStatus(TimeStatusDetailsSet domain);
	
	public Optional<TimeStatusDetailsSet> getTimeStatusDetailsSet(String companyId, int type);

	public Optional<NotificationDetailSet> getNotificationDetailSet(String companyId, int type);

}
