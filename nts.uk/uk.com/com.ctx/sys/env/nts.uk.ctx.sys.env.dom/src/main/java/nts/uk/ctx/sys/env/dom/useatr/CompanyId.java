package nts.uk.ctx.sys.env.dom.useatr;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

/**
 * The Class CompanyId.
 */
@StringMaxLength(17)
public class CompanyId extends CodePrimitiveValue<CompanyId>{
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new company id.
	 *
	 * @param rawValue the raw value
	 */
	public CompanyId(String rawValue) {
		super(rawValue);
	}

}
