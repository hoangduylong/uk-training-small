package nts.uk.ctx.bs.employee.dom.employee.employeelicense;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;
@IntegerRange(min = 0, max = 99999)
public class MaxNumberLicenses extends IntegerPrimitiveValue<MaxNumberLicenses>{

	

	public MaxNumberLicenses(Integer rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

	private static final long serialVersionUID = 1L;

}
