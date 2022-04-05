/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.employee;

import java.util.List;
import java.util.Optional;

/**
 * The Interface UseContactSettingRepository.
 */
public interface UseContactSettingRepository {

	/**
	 * Find.
	 *
	 * @param companyId the company id
	 * @param employeeId the employee id
	 * @param settingItem the setting item
	 * @return the optional
	 */
	Optional<UseContactSetting> find(String companyId, String employeeId, UserInfoItem settingItem);

	/**
	 * Find by employee id.
	 *
	 * @param employeeId the employee id
	 * @param companyId the company id
	 * @return the list
	 */
	List<UseContactSetting> findByEmployeeId(String employeeId, String companyId);

	/**
	 * Adds the.
	 *
	 * @param useContactSetting the use contact setting
	 * @param companyId the company id
	 */
	void add(UseContactSetting useContactSetting, String companyId);

	/**
	 * Update.
	 *
	 * @param useContactSetting the use contact setting
	 * @param companyId the company id
	 */
	void update(UseContactSetting useContactSetting, String companyId);
	
	
	/**
	 * Find by List employee id.
	 *
	 * @param employeeId the employee id
	 * @param companyId the company id
	 * @return the list
	 */
	List<UseContactSetting> findByListEmployeeId(List<String> employeeIds, String companyId);
}
