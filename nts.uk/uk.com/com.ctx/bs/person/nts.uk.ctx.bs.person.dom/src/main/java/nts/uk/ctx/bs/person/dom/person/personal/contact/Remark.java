package nts.uk.ctx.bs.person.dom.person.personal.contact;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * メモ:汎用文字列PrimitiveValue
 */
@StringMaxLength(200)
public class Remark extends StringPrimitiveValue<Remark> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public Remark(String rawValue) {
        super(rawValue);
    }
}
