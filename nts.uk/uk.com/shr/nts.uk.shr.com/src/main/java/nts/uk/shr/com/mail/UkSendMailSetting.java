package nts.uk.shr.com.mail;

import lombok.Value;
import nts.gul.mail.send.setting.SendMailSetting;

@Value
public class UkSendMailSetting {

	private final SendMailSetting basics;
	
	/** default of FROM */
	private final String mailAddressAdmin;
}
