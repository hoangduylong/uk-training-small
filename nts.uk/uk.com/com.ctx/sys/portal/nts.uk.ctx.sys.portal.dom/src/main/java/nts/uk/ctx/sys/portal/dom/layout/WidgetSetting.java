package nts.uk.ctx.sys.portal.dom.layout;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.レイアウト.レイアウト（New）.ウィジェット設定
 * 
 * @author LienPTK
 *
 */
@Getter
@AllArgsConstructor
public class WidgetSetting extends DomainObject {
	/** ウィジェット種類 */
	private WidgetType widgetType;
	/** 順番 */
	private int order;
}
