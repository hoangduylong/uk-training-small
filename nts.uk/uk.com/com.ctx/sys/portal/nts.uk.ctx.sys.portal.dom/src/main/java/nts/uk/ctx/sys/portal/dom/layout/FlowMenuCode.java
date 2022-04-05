package nts.uk.ctx.sys.portal.dom.layout;

import nts.arc.primitive.constraint.StringMaxLength;
import nts.uk.shr.com.primitive.CodePrimitiveValue;

@StringMaxLength(4)
public class FlowMenuCode extends CodePrimitiveValue<FlowMenuCode> {
	/**
	 * SerialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public FlowMenuCode(String rawValue) {
		super(rawValue);
	}
}