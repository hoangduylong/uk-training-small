/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.command.mailserver;

import lombok.Data;

/**
 * The Class ImapInfoDto.
 */
@Data
public class ImapInfoDto {
	
	/** The imap server. */
	public String imapServer;
	
	/** The imap use server. */
	public int imapUseServer;
	
	/** The imap port. */
	public int imapPort;
	
	/**
	 * Instantiates a new imap info dto.
	 *
	 * @param imapServer the imap server
	 * @param imapUseServer the imap use server
	 * @param imapPort the imap port
	 */
	public ImapInfoDto(String imapServer, int imapUseServer, int imapPort){
		this.imapServer = imapServer;
		this.imapUseServer = imapUseServer;
		this.imapPort = imapPort;
	}
	
	/**
	 * Instantiates a new imap info dto.
	 */
	public ImapInfoDto() {
		super();
	}
}
