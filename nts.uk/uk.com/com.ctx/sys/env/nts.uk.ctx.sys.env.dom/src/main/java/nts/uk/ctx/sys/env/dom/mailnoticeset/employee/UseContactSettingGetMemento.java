/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.employee;

/**
 * The Interface UseContactSettingGetMemento.
 */
public interface UseContactSettingGetMemento {
	
	/**
	 * Gets the employee ID.
	 *
	 * @return the employee ID
	 */
	public String getEmployeeID();

    /**
     * Gets the setting item.
     *
     * @return the setting item
     */
    public UserInfoItem getSettingItem();

    /**
     * Checks if is use mail setting.
     *
     * @return true, if is use mail setting
     */
    public boolean isUseMailSetting();
}
