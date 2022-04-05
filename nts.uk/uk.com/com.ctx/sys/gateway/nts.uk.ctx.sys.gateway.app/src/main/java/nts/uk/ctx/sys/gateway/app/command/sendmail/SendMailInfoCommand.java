package nts.uk.ctx.sys.gateway.app.command.sendmail;

import lombok.Getter;

/**
 * The Class LoginInfo.
 */
@Getter
public class SendMailInfoCommand {
	
	/** The login id. */
	private String loginId;
	
	/** The contract code. */
	private String contractCode;
}
