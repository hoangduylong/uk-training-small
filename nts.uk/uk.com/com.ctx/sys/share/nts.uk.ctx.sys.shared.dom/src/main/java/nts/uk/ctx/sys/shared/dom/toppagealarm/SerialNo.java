package nts.uk.ctx.sys.shared.dom.toppagealarm;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.PrimitiveValue;
import nts.arc.primitive.constraint.IntegerRange;
/**
 * 連番
 * @author yennth
 *
 */
@IntegerRange(max = 999999999, min = 0)
public class SerialNo extends IntegerPrimitiveValue<PrimitiveValue<Integer>>{

	public SerialNo(Integer rawValue) {
		super(rawValue);
	}
	private static final long serialVersionUID = 1L;

}
