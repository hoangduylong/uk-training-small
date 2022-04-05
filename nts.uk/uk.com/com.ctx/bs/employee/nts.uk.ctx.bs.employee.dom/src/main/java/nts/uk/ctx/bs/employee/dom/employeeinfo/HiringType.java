package nts.uk.ctx.bs.employee.dom.employeeinfo;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.ALPHA_NUMERIC)
@StringMaxLength(2)
public class HiringType extends IntegerPrimitiveValue<HiringType> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public HiringType(Integer rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
