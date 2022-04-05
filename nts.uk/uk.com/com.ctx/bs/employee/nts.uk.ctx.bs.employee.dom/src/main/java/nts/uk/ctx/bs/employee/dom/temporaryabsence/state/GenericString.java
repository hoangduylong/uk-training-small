/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.temporaryabsence.state;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * @author danpv
 *
 */
@StringMaxLength(100)
public class GenericString extends StringPrimitiveValue<GenericString>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @param rawValue
	 */
	public GenericString(String rawValue) {
		super(rawValue);
	}

	

}
