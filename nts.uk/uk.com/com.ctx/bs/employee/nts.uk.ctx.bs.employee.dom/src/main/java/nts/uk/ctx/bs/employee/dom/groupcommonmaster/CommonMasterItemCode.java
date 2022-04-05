package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 共通項目コード
 * 
 * @author sonnlb
 *
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(2)
public class CommonMasterItemCode extends StringPrimitiveValue<CommonMasterItemCode> {

	private static final long serialVersionUID = 1L;

	public CommonMasterItemCode(String rawValue) {
		super(rawValue);
	}

}
