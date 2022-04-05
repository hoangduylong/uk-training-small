package nts.uk.ctx.sys.auth.pub.user;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class CheckBeforeChangePassOutput {
	private boolean error;
	private List<PasswordMessageObject> message;
}
