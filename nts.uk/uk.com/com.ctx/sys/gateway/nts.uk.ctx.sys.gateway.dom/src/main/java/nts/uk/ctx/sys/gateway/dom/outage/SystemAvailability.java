package nts.uk.ctx.sys.gateway.dom.outage;

import lombok.RequiredArgsConstructor;

/**
 * システム利用状態
 */
@RequiredArgsConstructor
public enum SystemAvailability {

	/** 業務運用中 */
	AVAILABLE(1),
	
	/** 利用停止前段階 */
	PRE_OUTAGE(2),
	
	/** 利用停止中 */
	ON_OUTAGE(3),
	;
	
	public final int value;
}
