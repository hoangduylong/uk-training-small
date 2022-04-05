package nts.uk.ctx.sys.gateway.dom.securitypolicy.password;

import java.math.BigDecimal;

import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.constraint.DecimalMaxValue;
import nts.arc.primitive.constraint.DecimalMinValue;
@DecimalMaxValue("99")
@DecimalMinValue("0")
public class NotificationPasswordChange extends DecimalPrimitiveValue<NotificationPasswordChange> {
	
	private static final long serialVersionUID = 1L;

	public NotificationPasswordChange(BigDecimal rawValue) {
		super(rawValue);
	}

	/**
	 * 事前通知をするか
	 * @return
	 */
	public boolean needsNotify(int remainingDays) {
		int value = v().intValue();
		return value != 0 && remainingDays <= value;
	}
}
