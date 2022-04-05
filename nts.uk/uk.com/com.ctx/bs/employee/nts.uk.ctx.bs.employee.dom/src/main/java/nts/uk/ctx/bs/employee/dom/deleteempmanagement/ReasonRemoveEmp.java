package nts.uk.ctx.bs.employee.dom.deleteempmanagement;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(1000)
public class ReasonRemoveEmp extends StringPrimitiveValue<ReasonRemoveEmp>{

	/**
	 *  理由
	 */
	private static final long serialVersionUID = 1L;

	public ReasonRemoveEmp(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
