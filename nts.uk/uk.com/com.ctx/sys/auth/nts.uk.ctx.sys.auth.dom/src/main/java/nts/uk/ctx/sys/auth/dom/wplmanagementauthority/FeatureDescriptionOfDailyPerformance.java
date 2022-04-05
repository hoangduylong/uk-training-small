/**
 * 
 */
package nts.uk.ctx.sys.auth.dom.wplmanagementauthority;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 
 * @author tutk
 *
 */
@StringMaxLength(200)
public class FeatureDescriptionOfDailyPerformance extends StringPrimitiveValue<FeatureDescriptionOfDailyPerformance>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @param rawValue
	 */
	public FeatureDescriptionOfDailyPerformance(String rawValue) {
		super(rawValue);
	}

}
