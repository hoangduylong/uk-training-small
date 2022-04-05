/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class MailDestinationImport.
 */
@Getter
@Setter
public class MailDestinationImport {
	/** The out going mails. */
	private List<String> outGoingMails;

	/**
	 * Instantiates a new mail destination import.
	 */
	public MailDestinationImport() {
		super();
		this.outGoingMails = new ArrayList<>();
	}

	/**
	 * Adds the mail.
	 *
	 * @param mails
	 *            the mails
	 */
	public void addMail(List<String> mails) {
		this.outGoingMails.addAll(mails);
	}

}
