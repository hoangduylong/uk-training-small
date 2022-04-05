package nts.uk.ctx.bs.employee.dom.employeeinfo;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 
 * PhoneNumber
 */
@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(20)
public class CompanyMobile extends StringPrimitiveValue<CompanyMobile> {

	
	private static final long serialVersionUID = 1L;

	public CompanyMobile(String rawValue) {
		super(rawValue);
	}

}
