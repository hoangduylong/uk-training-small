package nts.uk.ctx.sys.gateway.dom.mail.service;

/**
 * 
 * @author Doan Duy Hung
 *
 */

public enum PrePostInitialAtr {

	/**
	 * 事前
	 */
	PRE(0, "事前"),

	/**
	 * 事後
	 */
	POST(1, "事後"),

	/**
	 * 選択なし
	 */
	NO_CHOISE(2, "選択なし ");

	public final Integer value;

	public final String name;

	private PrePostInitialAtr(int value, String name) {
		this.value = value;
		this.name = name;
	}

}
