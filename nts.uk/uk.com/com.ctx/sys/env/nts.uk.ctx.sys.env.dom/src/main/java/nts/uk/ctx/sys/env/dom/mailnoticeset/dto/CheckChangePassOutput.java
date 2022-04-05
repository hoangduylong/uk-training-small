/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailnoticeset.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckChangePassOutput {

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
	public CheckChangePassOutput(boolean error, List<PasswordMessageImport> message) {
		super();
		this.error = error;
		this.message = message;
	}

}
