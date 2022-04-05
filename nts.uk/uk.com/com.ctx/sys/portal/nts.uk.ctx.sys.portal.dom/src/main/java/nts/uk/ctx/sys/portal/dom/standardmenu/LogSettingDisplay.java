package nts.uk.ctx.sys.portal.dom.standardmenu;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.DomainObject;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/** 
 * ログ設定表示
 * @author Tung
 *
 */
@Getter
public class LogSettingDisplay extends DomainObject {

	/**
	 * ログイン履歴表示区分
	 */
	private NotUseAtr logLoginDisplay;
	
	/**
	 * 起動履歴表示区分
	 */
	private NotUseAtr logStartDisplay;
	
	/**
	 * 修正履歴表示区分
	 */
	private NotUseAtr logUpdateDisplay;
	
	public LogSettingDisplay(int logLoginDisplay, int logStartDisplay, int logUpdateDisplay) {
		this.logLoginDisplay = EnumAdaptor.valueOf(logLoginDisplay, NotUseAtr.class);
		this.logStartDisplay = EnumAdaptor.valueOf(logStartDisplay, NotUseAtr.class);
		this.logUpdateDisplay = EnumAdaptor.valueOf(logUpdateDisplay, NotUseAtr.class);
	}
	
}
