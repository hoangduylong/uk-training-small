/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.infra.repository.mailnoticeset.employee;

import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingSetMemento;
import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UserInfoItem;
import nts.uk.ctx.sys.env.infra.entity.mailnoticeset.employee.SevmtUseContactSya;
import nts.uk.ctx.sys.env.infra.entity.mailnoticeset.employee.SevstUseContactSetPK;

/**
 * The Class JpaUseContactSettingSetMemento.
 */
public class JpaUseContactSettingSetMemento implements UseContactSettingSetMemento{
	
	/** The entity. */
	private SevmtUseContactSya entity;
	
	/**
	 * Instantiates a new jpa use contact setting set memento.
	 *
	 * @param entity the entity
	 * @param companyId the company id
	 */
	public JpaUseContactSettingSetMemento(SevmtUseContactSya entity, String companyId) {
		this.entity = entity;
		SevstUseContactSetPK pk = new SevstUseContactSetPK();
		pk.setCid(companyId);
		this.entity.setSevstUseContactSetPK(pk);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingSetMemento#setEmployeeID(java.lang.String)
	 */
	@Override
	public void setEmployeeID(String employeeID) {
		this.entity.getSevstUseContactSetPK().setSid(employeeID);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingSetMemento#setSettingItem(nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UserInfoItem)
	 */
	@Override
	public void setSettingItem(UserInfoItem settingItem) {
		this.entity.getSevstUseContactSetPK().setSetItem(settingItem.value);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingSetMemento#setUseMailSetting(boolean)
	 */
	@Override
	public void setUseMailSetting(boolean useMailSetting) {
		this.entity.setUseMailSet(useMailSetting ? 1 : 0);
	}

}
