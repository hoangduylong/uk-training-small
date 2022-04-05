/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.command.mailserver;

import lombok.Data;

/**
 * The Class SmtpInfoDto.
 */
@Data
public class SmtpInfoDto {
	
	/** The smtp server. */
	public String smtpServer;
	
	/** The smtp port. */
	public int smtpPort;
	
	/**
	 * Instantiates a new smtp info dto.
	 *
	 * @param smtpIpVersions the smtp ip versions
	 * @param smtpServer the smtp server
	 * @param smtpTimeOut the smtp time out
	 * @param smtpPort the smtp port
	 */
	public SmtpInfoDto(String smtpServer, int smtpPort){
		this.smtpServer = smtpServer;
		this.smtpPort = smtpPort;
	}

	public SmtpInfoDto() {
		super();
	}
}
