/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.find.login.dto;

import lombok.Data;

/**
 * The Class CheckContractDto.
 */
@Data
public class CheckContractDto {

	private boolean showContract;

	/**
	 * Instantiates a new check contract dto.
	 *
	 * @param showContract the show contract
	 */
	public CheckContractDto(boolean showContract) {
		this.showContract = showContract;
	}
}
