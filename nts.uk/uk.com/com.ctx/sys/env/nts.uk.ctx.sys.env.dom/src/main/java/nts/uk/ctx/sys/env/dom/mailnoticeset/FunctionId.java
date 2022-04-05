package nts.uk.ctx.sys.env.dom.mailnoticeset;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

@IntegerRange(min=1, max=99)
public class FunctionId extends IntegerPrimitiveValue<FunctionId>  { 
	
	public FunctionId(Integer rawValue) {
		super(rawValue);
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 469104641065124164L;

}
