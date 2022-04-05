/**
 * 
 */
package nts.uk.ctx.sys.auth.dom.wplmanagementauthority;

import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.constraint.IntegerMaxValue;

/**
 * 
 * @author tutk
 *
 */
@IntegerMaxValue(999)
public class DailyPerformanceFunctionNo extends IntegerPrimitiveValue<DailyPerformanceFunctionNo>{

	private static final long serialVersionUID = 1L;
	
	/**
	 * @param rawValue
	 */
	public DailyPerformanceFunctionNo(int rawValue) {
		super(rawValue);
	}

	

}
