package nts.uk.ctx.sys.auth.pub.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class PasswordMessageObject {
	
	private String message;
	private String param;
	public PasswordMessageObject(String message, int param) {
		super();
		this.message = message;
		this.param = String.valueOf(param);
	}
	public PasswordMessageObject(String message) {
		super();
		this.message = message;
	}
	
	

	
}
