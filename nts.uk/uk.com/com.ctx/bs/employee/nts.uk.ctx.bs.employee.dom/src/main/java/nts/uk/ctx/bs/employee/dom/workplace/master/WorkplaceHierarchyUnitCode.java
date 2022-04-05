package nts.uk.ctx.bs.employee.dom.workplace.master;

import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;
import nts.uk.shr.com.primitive.ZeroPaddedCode;

/**
 * 職場階層単体コード
 */
@SuppressWarnings("serial")
@StringCharType(CharType.NUMERIC)
@StringMaxLength(3)
@ZeroPaddedCode
public class WorkplaceHierarchyUnitCode extends CodePrimitiveValue<WorkplaceHierarchyUnitCode> {

	public WorkplaceHierarchyUnitCode(String rawValue) {
		super(rawValue);
	}
}