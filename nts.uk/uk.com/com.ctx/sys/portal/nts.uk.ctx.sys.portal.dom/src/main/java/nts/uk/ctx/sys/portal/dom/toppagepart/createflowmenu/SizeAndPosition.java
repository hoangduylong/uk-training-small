package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.サイズと位置
 */
@Getter
@AllArgsConstructor
public class SizeAndPosition {

	/**
	 * column
	 */
	private HorizontalAndVerticalSize column;
	
	/**
	 * row
	 */
	private HorizontalAndVerticalSize row;
	
	/**
	 * height
	 */
	private HorizontalAndVerticalSize height;
	
	/**
	 * width
	 */
	private HorizontalAndVerticalSize width;
}
