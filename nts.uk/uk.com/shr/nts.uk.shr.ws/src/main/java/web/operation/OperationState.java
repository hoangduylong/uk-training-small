package web.operation;

import lombok.Value;

@Value
public class OperationState {
	
	private boolean stopping;
	
	private String message;
}
