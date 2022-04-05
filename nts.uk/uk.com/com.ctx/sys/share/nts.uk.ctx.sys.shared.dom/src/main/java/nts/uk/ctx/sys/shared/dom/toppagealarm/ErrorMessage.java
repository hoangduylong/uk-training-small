package nts.uk.ctx.sys.shared.dom.toppagealarm;

import nts.arc.primitive.PrimitiveValue;
import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * エラーメッセージ
 * @author yennth
 *
 */
@StringMaxLength(500)
public class ErrorMessage extends StringPrimitiveValue<PrimitiveValue<String>>{

	public ErrorMessage(String rawValue) {
		super(rawValue);
	}

	private static final long serialVersionUID = 1L;

}
