package nts.uk.ctx.sys.portal.dom.layout;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.レイアウト.レイアウト（New）.レイアウト種類
 * @author LienPTK
 *
 */
public enum LayoutType {
	/** フローメニュー */
	FLOW_MENU(0),
	/** フローメニュー（アップロード） */
	FLOW_MENU_UPLOAD(1),
	/** 外部URL */
	EXTERNAL_URL(2),
	/** ウィジェット */
	WIDGET(3);
	public final int value;

	/** The Constant values. */
	private final static LayoutType[] values = LayoutType.values();

	private LayoutType(int type) {
		this.value = type;
	}

	public static LayoutType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (LayoutType val : LayoutType.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
