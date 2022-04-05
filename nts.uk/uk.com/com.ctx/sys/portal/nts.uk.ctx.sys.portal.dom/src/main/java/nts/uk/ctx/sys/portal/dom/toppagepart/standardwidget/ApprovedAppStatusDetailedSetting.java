package nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.標準ウィジェット.承認すべき申請状況の詳細設定
 * 
 * @author tutt
 *
 */
@AllArgsConstructor
@Getter
@Setter
public class ApprovedAppStatusDetailedSetting {
	// 表示区分
	private NotUseAtr displayType;

	// 項目
	private ApprovedApplicationStatusItem item;
}
