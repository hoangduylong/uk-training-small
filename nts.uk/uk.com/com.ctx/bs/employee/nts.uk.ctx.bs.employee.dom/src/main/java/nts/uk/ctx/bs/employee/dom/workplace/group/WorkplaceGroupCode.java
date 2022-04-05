package nts.uk.ctx.bs.employee.dom.workplace.group;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;
import nts.uk.shr.com.primitive.ZeroPaddedCode;
/**
 * 職場グループコード
 * @author phongtq
 *
 */
@StringMaxLength(10)
@StringCharType(CharType.ALPHA_NUMERIC)
@ZeroPaddedCode
public class WorkplaceGroupCode extends CodePrimitiveValue<WorkplaceGroupCode> {
	
	private static final long serialVersionUID = 1L;
	
	public WorkplaceGroupCode(String rawValue) {
		super(rawValue);
	}
}
