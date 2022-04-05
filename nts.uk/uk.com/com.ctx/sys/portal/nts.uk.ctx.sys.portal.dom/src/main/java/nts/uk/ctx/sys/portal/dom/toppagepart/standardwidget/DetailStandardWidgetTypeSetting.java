package nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.標準ウィジェット.標準ウィジェット種別の詳細設定
 * @author NWS-DungDV
 *
 */
@Getter
@AllArgsConstructor
public class DetailStandardWidgetTypeSetting {
	// 表示区分
	private NotUseAtr displayCls;
	
	// 項目
	private StandardWidgetType standardWidgetType;
}
