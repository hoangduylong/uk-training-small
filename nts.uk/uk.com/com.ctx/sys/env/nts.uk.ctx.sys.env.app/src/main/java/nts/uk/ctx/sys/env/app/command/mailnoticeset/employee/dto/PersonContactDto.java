/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.command.mailnoticeset.employee.dto;

import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactGetMemento;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class PersonContactDto.
 */
public class PersonContactDto implements PersonContactGetMemento {

	/** The person id. */
	@SuppressWarnings("unused")
	private String personId;

	/** The mail address. */
	private String mailAddress;

	/** The mobile mail address. */
	private String mobileMailAddress;

	/** The cell phone no. */
	private String cellPhoneNo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactGetMemento#
	 * getPersonId()
	 */
	@Override
	public String getPersonId() {
		return AppContexts.user().personId();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactGetMemento#
	 * getMailAddress()
	 */
	@Override
	public String getMailAddress() {
		return this.mailAddress;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactGetMemento#
	 * getMobileMailAddress()
	 */
	@Override
	public String getMobileMailAddress() {
		return this.mobileMailAddress;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactGetMemento#
	 * getCellPhoneNo()
	 */
	@Override
	public String getCellPhoneNo() {
		return this.cellPhoneNo;
	}

}
