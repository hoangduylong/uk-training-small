package nts.uk.ctx.sys.portal.dom.toppagealarm;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページアラーム（ver4～）.トップページアラーム
 */
@StringCharType(CharType.NUMERIC)
@StringMaxLength(2)
public class AlarmListPatternCode extends StringPrimitiveValue<AlarmListPatternCode> {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public AlarmListPatternCode(String rawValue) {
		super(rawValue);
	}
}
