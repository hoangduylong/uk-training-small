package nts.uk.ctx.sys.gateway.app.command.systemsuspend;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopModeType;

@AllArgsConstructor
@Getter
public class UsageStopOutput {
	
	// 利用停止する: true, 利用停止しない: false
	private boolean isUsageStop;
	
	// 利用停止モード : true
	private StopModeType stopMode;
	
	// 利用停止のメッセージ
	private String stopMessage;
	
}
