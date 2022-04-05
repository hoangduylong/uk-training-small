package nts.uk.ctx.sys.gateway.dom.stopbycompany;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

//エラーアラームメッセージ ,停止予告のメッセージ
@StringMaxLength(400)
public class StopMessage extends StringPrimitiveValue<StopMessage> {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**
	 * Instantiates a new host name.
	 *
	 * @param rawValue
	 *            the raw value
	 */
	public StopMessage(String rawValue) {
		super(rawValue);
	}

}