package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.文字のサイズ
 */
@IntegerRange(min = 1, max = 99)
public class FontSize extends IntegerPrimitiveValue<FontSize> {

	private static final long serialVersionUID = 1L;

	public FontSize(Integer rawValue) {
		super(rawValue);
	}
}
