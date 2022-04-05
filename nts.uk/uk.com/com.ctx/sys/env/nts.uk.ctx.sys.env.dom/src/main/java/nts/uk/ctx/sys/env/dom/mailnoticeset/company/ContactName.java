package nts.uk.ctx.sys.env.dom.mailnoticeset.company;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 記念日のタイトル
 */
@StringMaxLength(40)
public class ContactName extends StringPrimitiveValue<ContactName> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public ContactName(String rawValue) {
        super(rawValue);
    }
}
