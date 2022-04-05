/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.employee;

/**
 * The Enum UserInfoItem.
 */
//ユーザー情報項目
public enum UserInfoItem {

	/** The none. */
	COMPANY_PC_MAIL(0, "Enum_UserInfoItem_COMPANY_PC_MAIL","会社PCメール"),
	
	/** The personal pc mail. */
	PERSONAL_PC_MAIL(1, "Enum_UserInfoItem_PERSONAL_PC_MAIL","個人PCメール"),
	
	/** The company mobile mail. */
	COMPANY_MOBILE_MAIL(2, "Enum_UserInfoItem_COMPANY_MOBILE_MAIL","会社携帯メール"),
	
	/** The personal mobile mail. */
	PERSONAL_MOBILE_MAIL(3, "Enum_UserInfoItem_PERSONAL_MOBILE_MAIL","個人携帯メール"),
	
	/** The company mobile phone. */
	COMPANY_MOBILE_PHONE(4, "Enum_UserInfoItem_COMPANY_MOBILE_PHONE","会社携帯電話"),
	
	/** The personal mobile phone. */
	PERSONAL_MOBILE_PHONE(5, "Enum_UserInfoItem_PERSONAL_MOBILE_PHONE","個人携帯電話"),
	
	/** The password. */
	PASSWORD(6, "Enum_UserInfoItem_PASSWORD","パスワード");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The description. */
	public final String description;

	/** The Constant values. */
	private final static UserInfoItem[] values = UserInfoItem.values();

	/**
	 * Instantiates a new abolish atr.
	 *
	 * @param value
	 *            the value
	 * @param nameId
	 *            the name id
	 * @param description
	 *            the description
	 */
	private UserInfoItem(int value, String nameId, String description) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the abolish atr
	 */
	public static UserInfoItem valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (UserInfoItem val : UserInfoItem.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
