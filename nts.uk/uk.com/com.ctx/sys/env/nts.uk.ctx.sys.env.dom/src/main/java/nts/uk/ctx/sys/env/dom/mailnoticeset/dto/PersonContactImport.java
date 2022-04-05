/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

import java.util.List;
import lombok.Getter;

/**
 * The Class PersonContactImport.
 */
// 個人連絡先
@Getter
public class PersonContactImport {

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
	
	// 緊急連絡先１
	/** The emergency number 1. */
	private String emergencyNumber1;
	
	// 緊急連絡先２
	/** The emergency number 2. */
	private String emergencyNumber2;
	
	// 他の連絡先
	private List<OtherContactDTO> otherContacts;

	/**
	 * Instantiates a new person contact import.
	 *
	 * @param personId
	 *            the person id
	 * @param mailAddress
	 *            the mail address
	 * @param mobileMailAddress
	 *            the mobile mail address
	 * @param cellPhoneNo
	 *            the cell phone no
	 */
	public PersonContactImport(String personId,
			String mailAddress,
			String mobileMailAddress,
			String cellPhoneNo,
			String emergencyNumber1,
			String emergencyNumber2,
			List<OtherContactDTO> otherContacts) {
		this.personId = personId;
		this.mailAddress = mailAddress;
		this.mobileMailAddress = mobileMailAddress;
		this.cellPhoneNo = cellPhoneNo;
		this.emergencyNumber1 = emergencyNumber1;
		this.emergencyNumber2 = emergencyNumber2;
		this.otherContacts = otherContacts;
	}

	/**
	 * Instantiates a new person contact import.
	 *
	 * @param memento
	 *            the memento
	 */
	public PersonContactImport(PersonContactGetMemento memento) {
		this.personId = memento.getPersonId();
		this.mailAddress = memento.getMailAddress();
		this.mobileMailAddress = memento.getMobileMailAddress();
		this.cellPhoneNo = memento.getCellPhoneNo();
	}

	/**
	 * Save to memento.
	 *
	 * @param memento
	 *            the memento
	 */
	public void saveToMemento(PersonContactSetMemento memento) {
		memento.setPersonId(this.personId);
		memento.setMailAddress(this.mailAddress);
		memento.setMobileMailAddress(this.mobileMailAddress);
		memento.setCellPhoneNo(this.cellPhoneNo);
	}

}
