package nts.uk.ctx.bs.employee.dom.employee.data.management.contact;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 座席内線番号
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(20)
public class SeatExtensionNumber extends StringPrimitiveValue<SeatExtensionNumber> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public SeatExtensionNumber(String rawValue) {
        super(rawValue);
    }
}
