package nts.uk.ctx.sys.portal.dom.titlemenu;
/**
 * author hieult
 */
import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;

@StringMaxLength(4)
@StringCharType (CharType.ALPHA_NUMERIC)

public class TitleMenuCD extends StringPrimitiveValue<TitleMenuCD> {

	private static final long serialVersionUID = 1L;

	public TitleMenuCD(String rawValue) {
		super(rawValue);

	}
}
