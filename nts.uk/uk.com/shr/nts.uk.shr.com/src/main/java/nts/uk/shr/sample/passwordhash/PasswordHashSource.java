package nts.uk.shr.sample.passwordhash;

import lombok.Value;

@Value
public class PasswordHashSource {

	private String passwordPlainText;
	private String salt;
}
