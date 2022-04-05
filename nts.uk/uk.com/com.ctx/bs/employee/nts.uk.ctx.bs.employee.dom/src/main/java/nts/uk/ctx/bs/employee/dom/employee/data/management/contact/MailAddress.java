package nts.uk.ctx.bs.employee.dom.employee.data.management.contact;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * メールアドレス
 */
@StringCharType(CharType.ANY_HALF_WIDTH)
@StringMaxLength(256)
public class MailAddress extends StringPrimitiveValue<MailAddress> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public MailAddress(String rawValue) {
        super(rawValue);
    }
}
