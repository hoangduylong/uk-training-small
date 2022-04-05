package nts.uk.ctx.sys.portal.dom.toppage;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページ.トップページ（New）.リロード間隔
 * 
 * @author LienPTK
 *
 */
public enum ReloadPeriodEnum {
	/** なし */
	NONE(0),
	/** 1分 */
	ONE_MINUTE(1),
	/** 5分 */
	FIVE_MINUTES(2),
	/** 10分*/
	TEN_MINUTES(3),
	/** 20 分*/
	TWENTY_MINUTES(4),
	/** 30分 */
	THIRTY_MINUTES(5),
	/** 40分 */
	FORTY_MINUTES(6),
	/** 50分 */
	FIFTY_MINUTES(7),
	/**  60分 */
	SIXTIES_MINUTE(8);

	public final int value;

	/** The Constant values. */
	private final static ReloadPeriodEnum[] values = ReloadPeriodEnum.values();

	private ReloadPeriodEnum(int type) {
		this.value = type;
	}

	public static ReloadPeriodEnum valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (ReloadPeriodEnum val : ReloadPeriodEnum.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
