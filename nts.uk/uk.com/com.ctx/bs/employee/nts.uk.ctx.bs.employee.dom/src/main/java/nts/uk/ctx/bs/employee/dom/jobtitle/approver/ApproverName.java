package nts.uk.ctx.bs.employee.dom.jobtitle.approver;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 承認者G名称
 * @author Doan Duy Hung
 *
 */
@StringMaxLength(22)
public class ApproverName extends StringPrimitiveValue<ApproverName>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ApproverName(String rawValue) {
		super(rawValue);
	}

}
