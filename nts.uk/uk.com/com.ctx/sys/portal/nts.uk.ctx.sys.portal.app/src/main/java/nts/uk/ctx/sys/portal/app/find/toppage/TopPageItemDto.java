/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.find.toppage;

import lombok.Data;

/**
 * The Class TopPageItemDto.
 */
@Data
public class TopPageItemDto {
	
	/** The top page code. */
	private String topPageCode;

	/** The top page name. */
	private String topPageName;

	/**
	 * Instantiates a new top page item dto.
	 *
	 * @param topPageCode the top page code
	 * @param topPageName the top page name
	 */
	public TopPageItemDto(String topPageCode, String topPageName) {
		super();
		this.topPageCode = topPageCode;
		this.topPageName = topPageName;
	}
}
