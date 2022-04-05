package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.横縦サイズ
 */
@IntegerRange(min = 1, max = 9999)
public class HorizontalAndVerticalSize extends IntegerPrimitiveValue<HorizontalAndVerticalSize> {

	private static final long serialVersionUID = 1L;

	public HorizontalAndVerticalSize(Integer rawValue) {
		super(rawValue);
	}
}
