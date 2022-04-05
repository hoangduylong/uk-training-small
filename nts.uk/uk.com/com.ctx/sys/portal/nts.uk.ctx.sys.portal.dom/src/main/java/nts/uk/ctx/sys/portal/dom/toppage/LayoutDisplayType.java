package nts.uk.ctx.sys.portal.dom.toppage;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページ.トップページ（New）.レイアウトの表示種類
 * @author LienPTK
 *
 */
public enum LayoutDisplayType {
	/** 中１ */
	MIDDLE_ONE(0),
	/** 左１右２ */
	LEFT_1_RIGHT_2(1),
	/** 左２右１ */
	LEFT_2_RIGHT_1(2),
	/** 左２中１右３ */
	LEFT_2_MIDDLE_1_RIGHT_3(3);

	public final int value;

	/** The Constant values. */
	private final static LayoutDisplayType[] values = LayoutDisplayType.values();

	private LayoutDisplayType(int type) {
		this.value = type;
	}

	public static LayoutDisplayType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (LayoutDisplayType val : LayoutDisplayType.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
