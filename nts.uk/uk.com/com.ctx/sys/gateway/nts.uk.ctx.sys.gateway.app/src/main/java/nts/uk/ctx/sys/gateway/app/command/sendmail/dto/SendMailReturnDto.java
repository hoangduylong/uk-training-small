package nts.uk.ctx.sys.gateway.app.command.sendmail.dto;

/**
 * The Class SendMailReturnDto.
 */
public class SendMailReturnDto {
	
	/** The url. */
	public String url;
	
	/**
	 * Instantiates a new send mail return dto.
	 */
	public SendMailReturnDto() {
		super();
	}

	/**
	 * Instantiates a new check change pass dto.
	 *
	 * @param url the url
	 */
	public SendMailReturnDto(String url) {
		super();
		this.url = url;
	}
}
