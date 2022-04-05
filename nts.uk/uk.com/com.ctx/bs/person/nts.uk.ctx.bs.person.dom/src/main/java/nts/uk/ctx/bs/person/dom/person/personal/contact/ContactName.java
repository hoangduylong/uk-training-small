package nts.uk.ctx.bs.person.dom.person.personal.contact;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 *  連絡先名:汎用文字列PrimitiveValue
 */
@StringMaxLength(41)
public class ContactName extends StringPrimitiveValue<ContactName> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public ContactName(String rawValue) {
        super(rawValue);
    }
}
