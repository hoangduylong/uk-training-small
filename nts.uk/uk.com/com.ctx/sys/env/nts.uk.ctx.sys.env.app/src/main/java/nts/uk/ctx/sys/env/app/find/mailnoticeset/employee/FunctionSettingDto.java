/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.app.find.mailnoticeset.employee;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class FunctionSettingDto.
 */
@Getter
@Setter
public class FunctionSettingDto {

	/** The function id. */
	private Integer functionId;

	/** The function name. */
	private String functionName;

	/** The send setting. */
	private Boolean sendSetting;

	/**
	 * Instantiates a new function setting dto.
	 *
	 * @param functionId
	 *            the function id
	 * @param functionName
	 *            the function name
	 * @param sendSetting
	 *            the send setting
	 */
	public FunctionSettingDto(Integer functionId, String functionName, Boolean sendSetting) {
		this.functionId = functionId;
		this.functionName = functionName;
		this.sendSetting = sendSetting;
	}

}
