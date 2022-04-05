package nts.uk.shr.com.operation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SystemOperationSetting {

	private SystemStopType type;

	/** 利用停止モード */
	private SystemOperationMode state;

	/** 利用停止のメッセージ */
	private String message;

	/** システム利用状態 */
	private SystemStopMode mode;
	
	private boolean isDisplay;

	private SystemOperationSetting(SystemStopType type, SystemOperationMode state, SystemStopMode mode,
			String message, boolean isDisplay) {
		this.type = type;
		this.state = state;
		this.mode = mode;
		this.message = message;
		this.isDisplay = isDisplay;
	}

	public static SystemOperationSetting setting(SystemStopType type, SystemOperationMode state, SystemStopMode mode,
			String stopMessage, String stopWarning, boolean isDisplay) {
		switch (state) {
		case STOP:
			return new SystemOperationSetting(type, state, mode, stopMessage, isDisplay);
		case IN_PROGRESS:
			return new SystemOperationSetting(type, state, mode, stopWarning, isDisplay);
		default:
			return new SystemOperationSetting(type, state, mode, null, isDisplay);
		}
	}

	@AllArgsConstructor
	public enum SystemOperationMode {

		/** 業務運用中 */
		RUNNING(0),
		/** 利用停止前段階 */
		IN_PROGRESS(1),
		/** 利用停止中 */
		STOP(2);

		public final int value;
	}

	@AllArgsConstructor
	public enum SystemStopMode {

		/** 担当者モード */
		PERSON_MODE(1),
		/** 管理者モード */
		ADMIN_MODE(2);

		public final int value;
	}

	@AllArgsConstructor
	public enum SystemStopType {

		/** 全体 */
		ALL_SYSTEM(1),
		/** 会社 */
		COMPANY(2);

		public final int value;
	}
}
