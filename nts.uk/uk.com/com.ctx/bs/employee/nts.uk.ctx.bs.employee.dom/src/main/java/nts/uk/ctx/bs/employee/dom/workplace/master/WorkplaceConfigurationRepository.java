package nts.uk.ctx.bs.employee.dom.workplace.master;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.com.history.DateHistoryItem;

/**
 * 
 * @author HungTT
 *
 */
public interface WorkplaceConfigurationRepository {

	public Optional<WorkplaceConfiguration> getWkpConfig(String companyId);
	
	public void addWorkplaceConfig(WorkplaceConfiguration workplaceConfig); 
	
	public void updateWorkplaceConfig(WorkplaceConfiguration workplaceConfig); 
	
	void updateHistoryItem(String companyId, DateHistoryItem historyItem);
	
	public void deleteWorkplaceConfig(String companyId, String workplaceHistoryId);
	
	public Optional<WorkplaceConfiguration> findByDate(String companyID, GeneralDate date);

	public List<WorkplaceConfiguration> findByCompanyIdAndPeriod(String companyId, DatePeriod period);

	public Optional<WorkplaceConfiguration> findByHistId(String companyID, String histId);

	public Optional<WorkplaceConfiguration> findByStartDate(String companyID, GeneralDate startDate);

}