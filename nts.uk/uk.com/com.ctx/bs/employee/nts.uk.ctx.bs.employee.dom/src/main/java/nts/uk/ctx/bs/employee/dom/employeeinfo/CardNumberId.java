package nts.uk.ctx.bs.employee.dom.employeeinfo;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(20)
public class CardNumberId extends StringPrimitiveValue<CardNumberId>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CardNumberId(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
