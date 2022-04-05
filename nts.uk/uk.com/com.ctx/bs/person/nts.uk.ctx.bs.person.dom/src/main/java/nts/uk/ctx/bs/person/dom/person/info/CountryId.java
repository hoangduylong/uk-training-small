/**
 * 
 */
package nts.uk.ctx.bs.person.dom.person.info;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * @author danpv
 *
 */
@StringMaxLength(value = 36)
public class CountryId extends StringPrimitiveValue<CountryId>{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CountryId(String countryId){
		super(countryId);
	}
}
