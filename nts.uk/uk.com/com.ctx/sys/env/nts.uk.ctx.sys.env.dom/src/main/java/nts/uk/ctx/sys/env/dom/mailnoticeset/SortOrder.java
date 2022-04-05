package nts.uk.ctx.sys.env.dom.mailnoticeset;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;

@IntegerRange(min=1, max=99)
public class SortOrder extends IntegerPrimitiveValue<SortOrder> { 
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4070645115723579453L;

	public SortOrder(Integer rawValue) {
		super(rawValue);
	}
}
