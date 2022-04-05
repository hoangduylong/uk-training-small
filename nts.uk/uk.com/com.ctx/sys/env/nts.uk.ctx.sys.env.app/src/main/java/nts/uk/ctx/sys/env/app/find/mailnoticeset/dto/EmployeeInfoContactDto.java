/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.find.mailnoticeset.dto;

import lombok.Getter;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactSetMemento;

/**
 * The Class EmployeeInfoContactDto.
 */
//社員連絡先
@Getter
public class EmployeeInfoContactDto implements EmployeeInfoContactSetMemento {

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

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactSetMemento#
	 * setEmployeeId(java.lang.String)
	 */
	@Override
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactSetMemento#
	 * setMailAddress(java.lang.String)
	 */
	@Override
	public void setMailAddress(String mailAddress) {
		this.mailAddress = mailAddress;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactSetMemento#
	 * setMobileMailAddress(java.lang.String)
	 */
	@Override
	public void setMobileMailAddress(String mobileMailAddress) {
		this.mobileMailAddress = mobileMailAddress;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactSetMemento#
	 * setCellPhoneNo(java.lang.String)
	 */
	@Override
	public void setCellPhoneNo(String cellPhoneNo) {
		this.cellPhoneNo = cellPhoneNo;
	}

}
