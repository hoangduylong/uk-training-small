package nts.uk.ctx.sys.gateway.app.command.sendmail;

import lombok.Getter;

/**
 * Gets the contract code.
 *
 * @return the contract code
 */
@Getter
public class SendMailInfoFormGCommand {
	
	/** The company code. */
	private String companyCode;
	
	/** The employee code. */
	private String employeeCode;
	
	/** The contract code. */
	private String contractCode;
}
