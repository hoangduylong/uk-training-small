package nts.uk.ctx.bs.employee.dom.employeeinfo;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 
 * 社員 MAIL
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(80)
public class EmployeeMail extends StringPrimitiveValue<EmployeeMail> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EmployeeMail(String rawValue) {
		super(rawValue);
	}

}
