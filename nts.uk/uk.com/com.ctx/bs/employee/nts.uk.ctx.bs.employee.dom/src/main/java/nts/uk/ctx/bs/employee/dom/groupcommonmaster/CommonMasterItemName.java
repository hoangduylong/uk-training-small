package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 共通項目名
 * 
 * @author sonnlb
 *
 */

@StringMaxLength(20)
public class CommonMasterItemName extends StringPrimitiveValue<CommonMasterItemName> {

	private static final long serialVersionUID = 1L;

	public CommonMasterItemName(String rawValue) {
		super(rawValue);
	}

}
