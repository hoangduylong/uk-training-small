package nts.uk.ctx.sys.env.dom.mailserver;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerMaxValue;
import nts.arc.primitive.constraint.IntegerMinValue;

/**
 * ポート
 */
@IntegerMinValue(0)
@IntegerMaxValue(65536)
public class Port extends IntegerPrimitiveValue<Port> {

	/**
	 * Instantiates a new port.
	 *
	 * @param rawValue the raw value
	 */
	public Port(Integer rawValue) {
		super(rawValue);
	}

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	
}
