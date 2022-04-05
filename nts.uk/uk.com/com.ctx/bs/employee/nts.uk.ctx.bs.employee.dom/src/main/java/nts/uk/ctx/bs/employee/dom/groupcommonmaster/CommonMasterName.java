package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 共通マスタ名
 * 
 * @author sonnlb
 * 
 */
@StringMaxLength(20)
public class CommonMasterName extends StringPrimitiveValue<CommonMasterName> {

	private static final long serialVersionUID = 1L;

	public CommonMasterName(String rawValue) {
		super(rawValue);
	}

}
