package nts.uk.ctx.sys.auth.pub.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordSplitObject {
	
	/** The length pass. */
	private Integer lengthPass;
	
	/** The number of digits. */
	private Integer numberOfDigits;
	
	/** The alphabet digit. */
	private Integer alphabetDigit;
	
	/** The symbol characters. */
	private Integer symbolCharacters;

}
