/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.employee;

/**
 * The Interface UseContactSettingSetMemento.
 */
public interface UseContactSettingSetMemento {
	
	/**
	 * Sets the employee ID.
	 *
	 * @param EmployeeID the new employee ID
	 */
	public void setEmployeeID(String EmployeeID);

	/**
	 * Sets the setting item.
	 *
	 * @param settingItem the new setting item
	 */
	public void setSettingItem(UserInfoItem settingItem);

	/**
	 * Sets the use mail setting.
	 *
	 * @param useMailSetting the new use mail setting
	 */
	public void setUseMailSetting(boolean useMailSetting);

}
