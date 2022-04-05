package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock;

import nts.arc.primitive.TimeDurationPrimitiveValue;
import nts.arc.primitive.constraint.TimeRange;

@TimeRange(max = "24:00", min = "00:00")
public class LockInterval extends TimeDurationPrimitiveValue<LockInterval> {

	private static final long serialVersionUID = 1L;

	public LockInterval(int timeAsMinutes) {
		super(timeAsMinutes);
	}

}
