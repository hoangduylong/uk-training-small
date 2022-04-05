package nts.uk.shr.com.operation;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SystemSuspendOut {
	
	private boolean isError;
	
	private String msgID;
	
	private String msgContent;
}
