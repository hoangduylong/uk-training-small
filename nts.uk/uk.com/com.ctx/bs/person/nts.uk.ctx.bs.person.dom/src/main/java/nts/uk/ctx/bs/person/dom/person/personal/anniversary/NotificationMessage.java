package nts.uk.ctx.bs.person.dom.person.personal.anniversary;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * お知らせのメッセージ
 */
@StringMaxLength(600)
public class NotificationMessage extends StringPrimitiveValue<NotificationMessage> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public NotificationMessage(String rawValue) {
        super(rawValue);
    }
}
