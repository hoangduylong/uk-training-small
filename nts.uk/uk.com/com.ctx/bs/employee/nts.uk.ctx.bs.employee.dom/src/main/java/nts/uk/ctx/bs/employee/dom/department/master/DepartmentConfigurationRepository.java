package nts.uk.ctx.bs.employee.dom.department.master;

import java.util.Optional;

import nts.arc.time.GeneralDate;

/**
 * 
 * @author HungTT
 *
 */
public interface DepartmentConfigurationRepository {

	public Optional<DepartmentConfiguration> getDepConfig(String companyId);
	
	public void addDepartmentConfig(DepartmentConfiguration depConfig);
	
	public void updateDepartmentConfig(DepartmentConfiguration depConfig);
	
	public void deleteDepartmentConfig(String companyId, String departmentHistoryId);
	
	public Optional<DepartmentConfiguration> findByDate(String companyID, GeneralDate date);

}
