/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.find.mailnoticeset.dto;

import lombok.Getter;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactSetMemento;

/**
 * The Class PersonContactDto.
 */
// 個人連絡先
@Getter
public class PersonContactDto implements PersonContactSetMemento {

	// 個人ID
	/** The person id. */
	private String personId;

	// メールアドレス
	/** The mail address. */
	private String mailAddress;

	// 携帯メールアドレス
	/** The mobile mail address. */
	private String mobileMailAddress;

	// 携帯電話番号
	/** The cell phone no. */
	private String cellPhoneNo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactSetMemento#
	 * setPersonId(java.lang.String)
	 */
	@Override
	public void setPersonId(String personId) {
		this.personId = personId;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactSetMemento#
	 * setMailAddress(java.lang.String)
	 */
	@Override
	public void setMailAddress(String mailAddress) {
		this.mailAddress = mailAddress;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactSetMemento#
	 * setMobileMailAddress(java.lang.String)
	 */
	@Override
	public void setMobileMailAddress(String mobileMailAddress) {
		this.mobileMailAddress = mobileMailAddress;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.dto.PersonContactSetMemento#
	 * setCellPhoneNo(java.lang.String)
	 */
	@Override
	public void setCellPhoneNo(String cellPhoneNo) {
		this.cellPhoneNo = cellPhoneNo;
	}

}
