package nts.uk.ctx.bs.employee.dom.employee.employeelicense;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringCharType(CharType.NUMERIC)
@StringMaxLength(12)
public class ContractCode extends StringPrimitiveValue<ContractCode> {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Instantiates a new contract code.
	 *
	 * @param rawValue the raw value
	 */
	public ContractCode(String rawValue) {
		super(rawValue);
	}
}