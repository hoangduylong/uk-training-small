/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.employee;

import lombok.Getter;

/**
 * The Class UseContactSetting.
 */
// 連絡先使用設定
@Getter
public class UseContactSetting {

	/** The Employee ID. */
	// 社員ID
	private String employeeId;

	/** The setting item. */
	// 設定項目
	private UserInfoItem settingItem;

	/** The use mail setting. */
	// メール利用設定
	private boolean useMailSetting;

	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(UseContactSettingSetMemento memento) {
		memento.setEmployeeID(this.employeeId);
		memento.setSettingItem(this.settingItem);
		memento.setUseMailSetting(this.useMailSetting);
	}

	/**
	 * Instantiates a new use contact setting.
	 *
	 * @param memento the memento
	 */
	public UseContactSetting(UseContactSettingGetMemento memento) {
		this.employeeId = memento.getEmployeeID();
		this.settingItem = UserInfoItem.valueOf(memento.getSettingItem().value);
		this.useMailSetting = memento.isUseMailSetting();
	}
}
