package nts.uk.ctx.sys.portal.dom.notice;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.お知らせのメッセージ
 * @author DungDV
 */
@StringMaxLength(600)
public class NotificationMessage extends StringPrimitiveValue<NotificationMessage> {

    private static final long serialVersionUID = 1L;

    public NotificationMessage(String rawValue) {
        super(rawValue);
    }
}