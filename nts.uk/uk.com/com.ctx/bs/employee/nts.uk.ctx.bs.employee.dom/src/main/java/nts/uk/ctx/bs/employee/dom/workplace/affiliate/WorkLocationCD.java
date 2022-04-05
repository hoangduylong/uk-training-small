package nts.uk.ctx.bs.employee.dom.workplace.affiliate;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 勤務場所コード
 */
@StringMaxLength(4)
public class WorkLocationCD extends StringPrimitiveValue<WorkLocationCD> {
    public WorkLocationCD(String rawValue) {
        super(rawValue);
    }

    private static final long serialVersionUID = 1L;
}
