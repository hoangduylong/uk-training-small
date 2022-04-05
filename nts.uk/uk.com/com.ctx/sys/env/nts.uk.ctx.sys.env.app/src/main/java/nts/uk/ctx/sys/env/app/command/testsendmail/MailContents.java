package nts.uk.ctx.sys.env.app.command.testsendmail;

import lombok.Data;

@Data
public class MailContents {
	/** subject of mail */
	private String subject;
	
	/** body message of mail */
	private String body;
	
	/**
	 * Constructs.
	 * @param subject subject
	 * @param body body
	 */
	public MailContents() {
		super();
	}
		
}
