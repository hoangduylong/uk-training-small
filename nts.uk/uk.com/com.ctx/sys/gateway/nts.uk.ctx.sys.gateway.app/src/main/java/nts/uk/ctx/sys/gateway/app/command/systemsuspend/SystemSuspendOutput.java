package nts.uk.ctx.sys.gateway.app.command.systemsuspend;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SystemSuspendOutput {
	
	private boolean isError;
	
	private String msgID;
	
	private String msgContent;
	
}
