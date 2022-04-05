package nts.uk.ctx.sys.gateway.dom.outage;

import java.util.Optional;

import lombok.Value;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

public interface PlannedOutage {

	PlannedOutageState getState();
	
	default Status statusFor(LoginUserRoles roles) {
		return getState().statusFor(roles);
	}

	/** 状態 */
	@Value
	public static class Status {
		boolean isAvailable;
		Optional<String> message;
		
		/**
		 * 通常運用中
		 * @return
		 */
		public static Status available() {
			return new Status(true, Optional.empty());
		}
		
		/**
		 * 利用可能だが利用停止中
		 * @param message
		 * @return
		 */
		public static Status availableBut(String message) {
			return new Status(true, Optional.of(message));
		}
		
		/**
		 * 利用不可
		 * @param message
		 * @return
		 */
		public static Status notAvailable(String message) {
			return new Status(false, Optional.of(message));
		}
		
		/**
		 * 利用停止中か
		 * @return
		 */
		public boolean isOutage() {
			return message.isPresent();
		}
	}
}
