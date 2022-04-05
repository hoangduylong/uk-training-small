package nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.標準ウィジェット.勤務状況の詳細設定
 * 
 * @author tutt
 *
 */
@Getter
@AllArgsConstructor
public class DetailedWorkStatusSetting {
	// 表示区分
	private NotUseAtr displayType;

	// 項目
	private WorkStatusItem item;
}
