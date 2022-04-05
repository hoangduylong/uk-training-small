package nts.uk.ctx.bs.employee.dom.workplace.master;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.WorkplaceConfigInfo;
import nts.uk.ctx.bs.employee.dom.workplace.export.WkpDto;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfo;
import nts.uk.shr.com.history.DateHistoryItem;

/**
 * 
 * @author HungTT
 *
 */
public interface WorkplaceInformationRepository {

	public List<WorkplaceInformation> getAllWorkplaceByCompany(String companyId, String wkpHistId);
	
	public List<WorkplaceInformation> getAllActiveWorkplaceByCompany(String companyId, String wkpHistId);
	
	public Optional<WorkplaceInformation> getWorkplaceByKey(String companyId, String wkpHistId, String wkpId);
	
	public Optional<WorkplaceInformation> getDeletedWorkplaceByCode(String companyId, String wkpHistId, String wkpCode);
	
	public Optional<WorkplaceInformation> getActiveWorkplaceByCode(String companyId, String wkpHistId, String wkpCode);
	
	public List<WorkplaceInformation> getActiveWorkplaceByWkpIds(String companyId, String wkpHistId, List<String> listWorkplaceId);

	List<WorkplaceInformation> getAllWorkplaceByWkpIds(String companyId, String wkpHistId, List<String> listWorkplaceId);
	
	public void addWorkplace(WorkplaceInformation workplace);
	
	public void addWorkplaces(List<WorkplaceInformation> listWorkplace);
	
	public void updateWorkplace(WorkplaceInformation workplace);
	
	public void deleteWorkplaceInforOfHistory(String companyId, String wkpHistId);
	
	public void deleteWorkplaceInfor(String companyId, String wkpHistId, String wkpId);
	/**
	 * get wkpinfo for new table
	 * @param companyId
	 * @param wkpId
	 * @param baseDate
	 * @return
	 */
	public Optional<WorkplaceInformation> getWkpNewByIdDate(String companyId, String wkpId, GeneralDate baseDate);

	public Map<DateHistoryItem, List<WorkplaceConfigInfo>> findAllParentByWkpId(String companyId, DatePeriod baseDate, List<String> wkpId);

	public List<WorkplaceInformation> findByHistoryIdsAndWplIds(String companyId, List<String> historyIds, List<String> listWorkplaceId);

	public List<WkpDto> findByBaseDateWkpIds(String companyId, List<String> listWorkplaceId, GeneralDate baseDate);

	public List<WorkplaceInformation> findAll(String companyId);

	public List<WorkplaceInfo> findAll(String companyId, GeneralDate baseDate);

	public List<WorkplaceInfo> findByHistory(List<String> historyList);

	public Optional<WorkplaceInformation> getWkpNewByCdDate(String companyId, String wkpCd, GeneralDate baseDate);

	List<WorkplaceInfo> findByWkpId(String wkpId);

	List<WorkplaceInformation> findByHistoryIds(String companyId, List<String> historyIds);

	List<WorkplaceInfo> findByWkpIds(List<String> wkpIds);

	List<WorkplaceInformation> findByWkpIds(String companyId, List<String> listWorkplaceId);

	List<WorkplaceInformation> findByCompany(String companyId);

	Optional<WorkplaceConfigInfo> findAllParentByWkpId(String companyId, GeneralDate baseDate, String wkpId);

	List<WorkplaceInformation> findByBaseDateWkpIds2(String companyId, List<String> listWorkplaceId,
			GeneralDate baseDate);
}
