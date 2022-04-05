/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.find.mailnoticeset.employee;

import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingSetMemento;
import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UserInfoItem;

/**
 * The Class UseContactSettingDto.
 */
public class UseContactSettingDto implements UseContactSettingSetMemento {
	/** The Employee ID. */
	// 社員ID
	public String employeeId;

	/** The setting item. */
	// 設定項目
	public Integer settingItem;

	/** The use mail setting. */
	// メール利用設定
	public Boolean useMailSetting;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingSetMemento
	 * #setEmployeeID(java.lang.String)
	 */
	@Override
	public void setEmployeeID(String EmployeeID) {
		this.employeeId = EmployeeID;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingSetMemento
	 * #setSettingItem(nts.uk.ctx.sys.env.dom.mailnoticeset.employee.
	 * UserInfoItem)
	 */
	@Override
	public void setSettingItem(UserInfoItem settingItem) {
		this.settingItem = settingItem.value;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingSetMemento
	 * #setUseMailSetting(boolean)
	 */
	@Override
	public void setUseMailSetting(boolean useMailSetting) {
		this.useMailSetting = useMailSetting;
	}
}
