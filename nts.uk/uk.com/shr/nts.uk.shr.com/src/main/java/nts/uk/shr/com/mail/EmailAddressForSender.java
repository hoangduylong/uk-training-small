package nts.uk.shr.com.mail;

import lombok.RequiredArgsConstructor;
import nts.gul.mail.send.MailOriginator;
import nts.gul.mail.send.MailRecipient;

@RequiredArgsConstructor
public class EmailAddressForSender implements MailOriginator, MailRecipient {

	private final String emailAddress;
	
	@Override
	public String mailAddress() {
		return this.emailAddress;
	}

}
