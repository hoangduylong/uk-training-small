package nts.uk.ctx.bs.employee.dom.employee.data.management.contact;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 座席ダイヤルイン
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(20)
public class SeatDialIn extends StringPrimitiveValue<SeatDialIn> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public SeatDialIn(String rawValue) {
        super(rawValue);
    }
}
