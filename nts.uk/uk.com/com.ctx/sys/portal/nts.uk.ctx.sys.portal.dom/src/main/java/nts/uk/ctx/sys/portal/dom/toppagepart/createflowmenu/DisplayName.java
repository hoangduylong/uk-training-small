package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.表示名称
 */
@StringMaxLength(40)
public class DisplayName extends StringPrimitiveValue<DisplayName> {

	private static final long serialVersionUID = 1L;

	public DisplayName(String rawValue) {
		super(rawValue);
	}
}
