package nts.uk.ctx.bs.employee.dom.employee.mgndata;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/** 外部コード */
@StringMaxLength(12)
public class ExternalCode extends StringPrimitiveValue<ExternalCode> {
	private static final long serialVersionUID = 1L;

	public ExternalCode(String rawValue) {
		super(rawValue);
	}

}
