/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

import lombok.Getter;

/**
 * The Class EmployeeInfoContactImport.
 */
//社員連絡先
@Getter
public class EmployeeInfoContactImport {

	// 社員ID
	/** The employee id. */
	private String employeeId;

	// メールアドレス
	/** The mail address. */
	private String mailAddress;

	// 携帯メールアドレス
	/** The mobile mail address. */
	private String mobileMailAddress;

	// 携帯電話番号
	/** The cell phone no. */
	private String cellPhoneNo;
	
	// 座席ダイヤルイン
	private String seatDialIn;
	
	//座席内線番号
	private String seatExtensionNumber;

	/**
	 * Instantiates a new employee info contact import.
	 *
	 * @param employeeId
	 *            the employee id
	 * @param mailAddress
	 *            the mail address
	 * @param mobileMailAddress
	 *            the mobile mail address
	 * @param cellPhoneNo
	 *            the cell phone no
	 */
	public EmployeeInfoContactImport(String employeeId,
			String mailAddress,
			String mobileMailAddress,
			String cellPhoneNo,
			String seatDialIn,
			String seatExtensionNumber) {
		this.employeeId = employeeId;
		this.mailAddress = mailAddress;
		this.mobileMailAddress = mobileMailAddress;
		this.cellPhoneNo = cellPhoneNo;
		this.seatDialIn = seatDialIn;
		this.seatExtensionNumber = seatExtensionNumber;
	}

	/**
	 * Instantiates a new employee info contact import.
	 *
	 * @param memento
	 *            the memento
	 */
	public EmployeeInfoContactImport(EmployeeInfoContactGetMemento memento) {
		this.employeeId = memento.getEmployeeId();
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
	public void saveToMemento(EmployeeInfoContactSetMemento memento) {
		memento.setEmployeeId(this.employeeId);
		memento.setMailAddress(this.mailAddress);
		memento.setMobileMailAddress(this.mobileMailAddress);
		memento.setCellPhoneNo(this.cellPhoneNo);
	}

}
