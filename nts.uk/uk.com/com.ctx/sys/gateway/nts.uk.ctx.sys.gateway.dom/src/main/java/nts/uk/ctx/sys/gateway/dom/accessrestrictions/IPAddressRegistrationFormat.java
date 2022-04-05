/******************************************************************
 * Copyright (c) 2020 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.accessrestrictions;

/**
 * @author thanhpv
 * @name IPアドレスの登録形式
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.GateWay.アクセス制限.IPアドレスの登録形式
 */
public enum IPAddressRegistrationFormat {
	
	SPECIFIC_IP_ADDRESS(0, "特定のIPアドレス"),
	
	IP_ADDRESS_RANGE(1, "IPアドレスの範囲");
	
	/** The value. */
	public int value;

	/** The name id. */
	public String nameId;

	/** The Constant values. */
	private final static IPAddressRegistrationFormat[] values = IPAddressRegistrationFormat.values();

	/**
	 * Instantiates a new manage distinct.
	 *
	 * @param value            the value
	 * @param nameId the name id
	 * @param description            the description
	 */
	private IPAddressRegistrationFormat(int value, String nameId) {
		this.value = value;
		this.nameId = nameId;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the manage distinct
	 */
	public static IPAddressRegistrationFormat valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (IPAddressRegistrationFormat val : IPAddressRegistrationFormat.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}

}
