package nts.uk.ctx.bs.person.dom.person.personal.anniversary;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * 記念日のタイトル
 */
@StringMaxLength(60)
public class AnniversaryTitle extends StringPrimitiveValue<AnniversaryTitle> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public AnniversaryTitle(String rawValue) {
        super(rawValue);
    }
}
