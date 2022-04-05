package nts.uk.ctx.sys.gateway.pub.stopbycompany;

import lombok.Builder;
import lombok.Data;

/**
 * The Class UsageStopOutputExport.
 */
@Data
@Builder
public class UsageStopOutputExport {
	/** The is usage stop. 
	 * 利用停止する: true, 利用停止しない: false
	 */
	private boolean isUsageStop;
	
	/** The stop mode. 
	 * 利用停止モード : true
	 */
	private int stopMode;
	
	/** The stop message. 
	 * 利用停止のメッセージ
	 */
	private String stopMessage;
}
