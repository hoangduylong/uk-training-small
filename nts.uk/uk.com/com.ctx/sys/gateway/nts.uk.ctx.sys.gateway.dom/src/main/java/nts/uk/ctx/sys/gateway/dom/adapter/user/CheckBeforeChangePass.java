package nts.uk.ctx.sys.gateway.dom.adapter.user;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckBeforeChangePass {
	/** The error. */
	private boolean error;

	/** The message. */
	private List<PasswordMessageImport> message;

	/**
	 * Instantiates a new check before change pass output.
	 *
	 * @param error
	 *            the error
	 * @param message
	 *            the message
	 */
	public CheckBeforeChangePass(boolean error, List<PasswordMessageImport> message) {
		super();
		this.error = error;
		this.message = message;
	}
}
