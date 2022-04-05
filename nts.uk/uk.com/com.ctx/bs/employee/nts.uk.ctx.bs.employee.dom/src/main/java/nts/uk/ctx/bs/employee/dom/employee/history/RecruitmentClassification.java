package nts.uk.ctx.bs.employee.dom.employee.history;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/** 採用区分 */
@StringMaxLength(36)
public class RecruitmentClassification extends StringPrimitiveValue<RecruitmentClassification> {
	/**
	 * Default serial version
	 */
	private static final long serialVersionUID = 1L;

	public RecruitmentClassification(String rawValue) {
		super(rawValue);
	}
}
