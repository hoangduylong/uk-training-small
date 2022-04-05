package nts.uk.ctx.sys.gateway.dom.outage;

import lombok.Value;
import nts.arc.layer.dom.objecttype.DomainValue;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopMessage;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

/**
 * 利用停止状態
 */
@Value
public class PlannedOutageState implements DomainValue {

	/** システム利用状態 */
	private final SystemAvailability systemAvailability;
	
	/** 利用停止モード */
	private final OutageMode outageMode;
	
	/** 停止予告のメッセージ */
	private final StopMessage noticeMessage;
	
	/** 利用停止のメッセージ */
	private final StopMessage outageMessage;

	/**
	 * 利用できるか
	 * @param roles
	 * @return
	 */
	public PlannedOutage.Status statusFor(LoginUserRoles roles) {
		
		if (systemAvailability != SystemAvailability.ON_OUTAGE) {
			return PlannedOutage.Status.available();
		}
		
		if (outageMode.canUseBy(roles)) {
			return PlannedOutage.Status.availableBut("Msg_1475");
		}

		return PlannedOutage.Status.notAvailable(outageMessage.v());
	}
	
}
