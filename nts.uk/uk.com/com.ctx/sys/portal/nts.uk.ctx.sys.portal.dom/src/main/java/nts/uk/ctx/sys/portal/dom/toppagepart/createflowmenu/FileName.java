
package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * author hieult
 */
@StringMaxLength(255)
public class FileName extends StringPrimitiveValue<FileName> {

	private static final long serialVersionUID = 1L;

	public FileName(String rawValue) {
		super(rawValue);
	}

}
