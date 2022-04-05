package nts.uk.shr.sample.mail;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.gul.mail.send.MailContents;
import nts.uk.shr.com.mail.MailSender;

@Produces(MediaType.APPLICATION_JSON)
@Path("/sample/mail")
public class SampleMailWebService {

	@Inject
	private MailSender sender;
	
	@POST
	@Path("testsend")
	public void testSend() {
		MailContents contents = new MailContents("テスト", "テストメールです\r\nあいうえお");
		
		sender.sendFromAdmin("m_kitahira@nittsusystem.co.jp", contents);
	}
}
