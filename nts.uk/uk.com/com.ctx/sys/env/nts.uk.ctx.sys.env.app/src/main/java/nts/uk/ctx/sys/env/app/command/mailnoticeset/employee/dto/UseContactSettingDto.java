/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.command.mailnoticeset.employee.dto;

import lombok.Value;
import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingGetMemento;
import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UserInfoItem;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class UseContactSettingDto.
 */
@Value
public class UseContactSettingDto implements UseContactSettingGetMemento {

	/** The employee id. */
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
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingGetMemento
	 * #getEmployeeID()
	 */
	@Override
	public String getEmployeeID() {
		return AppContexts.user().employeeId();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingGetMemento
	 * #getSettingItem()
	 */
	@Override
	public UserInfoItem getSettingItem() {
		return UserInfoItem.valueOf(this.settingItem);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingGetMemento
	 * #isUseMailSetting()
	 */
	@Override
	public boolean isUseMailSetting() {
		return this.useMailSetting;
	}

}
