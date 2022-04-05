package nts.uk.ctx.sys.gateway.dom.stopbycompany;

/**
 * システム利用状態
 * @author sonnlb
 */
public enum StopModeType {

	/**
	 * 担当者モード
	 */
	PERSON_MODE(1),
	/**
	 * 管理者モード
	 */
	ADMIN_MODE(2);

	public final int value;

	private StopModeType(int value) {
		this.value = value;
	}

}
