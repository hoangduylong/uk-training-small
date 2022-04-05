package nts.uk.ctx.sys.env.app.command.testsendmail;

import lombok.Data;

@Data
public class MailServerTestCommand {
	
	private String mailTo;
	
	private String mailFrom;
	
	private MailContents contents;
	
	
	public MailServerTestCommand(){
		super();
	}
}
