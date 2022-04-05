package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.横縦の位置
 */
@Getter
@AllArgsConstructor
public class HorizontalAndVerticalPosition {
	
	/**
	 * 横の位置
	 */
	private HorizontalPosition horizontalPosition;
	
	/**
	 * 縦の位置
	 */
	private VerticalPosition verticalPosition;
}
