/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.app.find.roleset;

import lombok.Value;

/**
* The Class WebMenuAdapterImpl.
* @author HieuNV
*/
@Value
public class WebMenuImportDto {

	/** Webメニューコード */
	private String webMenuCode;

	/** Webメニュー名称 */
	private String webMenuName;	
}
