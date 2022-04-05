/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.command.mailserver;

import lombok.Data;

/**
 * The Class PopInfoDto.
 */
@Data
public class PopInfoDto {
	
	/** The pop server. */
	public String popServer;
	
	/** The pop use server. */
	public int popUseServer;
	
	/** The pop port. */
	public int popPort;
	
	/**
	 * Instantiates a new pop info dto.
	 *
	 * @param popServer the pop server
	 * @param popUseServer the pop use server
	 * @param popPort the pop port
	 */
	public PopInfoDto(String popServer, int popUseServer, int popPort){
		this.popServer = popServer;
		this.popUseServer = popUseServer;
		this.popPort = popPort;
	}
	
	/**
	 * Instantiates a new pop info dto.
	 */
	public PopInfoDto() {
		super();
	}
}
