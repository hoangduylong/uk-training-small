package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import java.util.Optional;

import lombok.Builder;
import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.ラベル設定
 */
@Getter
@Builder
public class LabelSetting extends DomainObject {
	
	/**
	 * サイズと位置
	 */
	private SizeAndPosition sizeAndPosition;
	
	/**
	 * ラベル内容
	 */
	private Optional<LabelContent> labelContent;
	
	/**
	 * 文字の設定
	 */
	private FontSetting fontSetting;
}
