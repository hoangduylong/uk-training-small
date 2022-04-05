package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.ctx.sys.portal.dom.webmenu.ColorCode;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.サイズと色
 */
@Getter
@AllArgsConstructor
public class SizeAndColor {
	
	public static final int BOLD = 1;
	
	/**
	 * 太字
	 */
	private boolean isBold;
	
	/**
	 * 背景の色
	 */
	private Optional<ColorCode> backgroundColor = Optional.empty();
	
	/**
	 * 文字の色
	 */
	private Optional<ColorCode> fontColor = Optional.empty();
	
	/**
	 * 文字のサイズ
	 */
	private FontSize fontSize;
}
