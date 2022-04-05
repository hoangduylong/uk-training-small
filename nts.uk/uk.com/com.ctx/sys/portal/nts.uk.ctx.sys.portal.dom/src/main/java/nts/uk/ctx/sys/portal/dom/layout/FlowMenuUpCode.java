package nts.uk.ctx.sys.portal.dom.layout;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

@StringMaxLength(4)
public class FlowMenuUpCode extends CodePrimitiveValue<FlowMenuUpCode> {
	/**
	 * SerialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public FlowMenuUpCode(String rawValue) {
		super(rawValue);
	}
}