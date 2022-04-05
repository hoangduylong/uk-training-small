package nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.標準ウィジェット.申請状況の詳細設定
 * 
 * @author tutt
 *
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationStatusDetailedSetting {
	// 表示区分
	private NotUseAtr displayType;

	// 項目
	private ApplicationStatusWidgetItem item;
}
