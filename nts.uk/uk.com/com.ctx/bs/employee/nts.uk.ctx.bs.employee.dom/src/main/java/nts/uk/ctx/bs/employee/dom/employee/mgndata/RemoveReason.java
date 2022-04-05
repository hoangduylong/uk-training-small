package nts.uk.ctx.bs.employee.dom.employee.mgndata;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/** 削除理由 */
@StringMaxLength(300)
public class RemoveReason extends StringPrimitiveValue<RemoveReason> {

	/**
	 * Default serialVersion
	 */
	private static final long serialVersionUID = 1L;

	public RemoveReason(String rawValue) {
		super(rawValue);
	}
}