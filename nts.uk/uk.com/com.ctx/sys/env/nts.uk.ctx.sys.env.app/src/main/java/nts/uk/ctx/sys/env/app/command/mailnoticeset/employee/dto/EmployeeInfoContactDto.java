/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.command.mailnoticeset.employee.dto;

import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactGetMemento;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class EmployeeInfoContactDto.
 */
public class EmployeeInfoContactDto implements EmployeeInfoContactGetMemento {

	/** The employee id. */
	@SuppressWarnings("unused")
	private String employeeId;

	/** The mail address. */
	private String mailAddress;

	/** The mobile mail address. */
	private String mobileMailAddress;

	/** The cell phone no. */
	private String cellPhoneNo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactGetMemento#
	 * getEmployeeId()
	 */
	@Override
	public String getEmployeeId() {
		return AppContexts.user().employeeId();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactGetMemento#
	 * getMailAddress()
	 */
	@Override
	public String getMailAddress() {
		return this.mailAddress;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactGetMemento#
	 * getMobileMailAddress()
	 */
	@Override
	public String getMobileMailAddress() {
		return this.mobileMailAddress;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactGetMemento#
	 * getCellPhoneNo()
	 */
	@Override
	public String getCellPhoneNo() {
		return this.cellPhoneNo;
	}

}
