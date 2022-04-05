package nts.uk.ctx.sys.portal.dom.toppagesetting;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

/**
 * 	UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページ設定.トップページ設定（New）.切換日
 *	PrimitiveValue 切換日
 */
@IntegerRange(min = 1, max = 31)
public class SwitchingDate extends IntegerPrimitiveValue<SwitchingDate> {
	/**
	 * SerialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public SwitchingDate(Integer rawValue) {
		super(rawValue);
	}
}
