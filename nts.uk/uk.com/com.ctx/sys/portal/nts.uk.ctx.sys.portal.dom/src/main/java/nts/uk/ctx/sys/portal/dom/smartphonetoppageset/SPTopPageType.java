package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.uk.ctx.sys.portal.dom.enums.System;

/**
 * スマホトップページ種別
 * 
 * @author sonnh1
 *
 */
@Getter
public class SPTopPageType {
	/**
	 * システム/ System
	 */
	private System system;
	/**
	 * 種別
	 */
	private Type type;
	
	public SPTopPageType(System system, Type type) {
		super();
		this.system = system;
		this.type = type;
	}
	
	public static SPTopPageType createFromJavaType(int system, int type) {
		return new SPTopPageType(EnumAdaptor.valueOf(system, System.class), EnumAdaptor.valueOf(type, Type.class));
	}
}
