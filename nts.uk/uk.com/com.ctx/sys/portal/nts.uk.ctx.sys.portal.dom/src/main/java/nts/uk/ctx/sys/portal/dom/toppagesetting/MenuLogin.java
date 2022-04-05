package nts.uk.ctx.sys.portal.dom.toppagesetting;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.DomainObject;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;

/**
 * The Class MenuLogin.
 * DomainObject ログインメニュー
 */
@Getter
@AllArgsConstructor
public class MenuLogin extends DomainObject {

	/** 
	 * The system. 
	 *	 システム
	 **/
	private System system;
	
	/**
	 * 	メニュー分類
	 */
	private MenuClassification menuClassification;
	
	/** 
	 * The login menu code. 
	 * 	ログインメニューコード 
	 **/
	private LoginMenuCode loginMenuCode;
}
