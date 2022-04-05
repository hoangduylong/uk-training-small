package nts.uk.ctx.sys.env.dom.mailnoticeset.company;

/**
 * メール分類
 *
 * @author admin
 *
 */
public enum EmailClassification {
	/**
	 * 会社メールアドレス
	 */
	COMPANY_EMAIL_ADDRESS(0),

	/**
	 * 会社携帯メールアドレス
	 */
	COMPANY_MOBILE_EMAIL_ADDRESS(1),

	/**
	 * 個人メールアドレス
	 */
	PERSONAL_EMAIL_ADDRESS(2),

	/**
	 * 個人携帯メールアドレス
	 */
	PERSONAL_MOBILE_EMAIL_ADDRESS(3);

	public final int value;

	/**
	 *
	 * @param code
	 */
	private EmailClassification(int value) {
		this.value = value;
	}

	/**
	 *
	 * @param value
	 * @return
	 */
	public static EmailClassification valueOf(int value) {
		// Find value.
		for (EmailClassification val : EmailClassification.values()) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
