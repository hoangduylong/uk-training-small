package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import java.util.Optional;

import lombok.Builder;
import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.リンク設定
 */
@Getter
@Builder
public class LinkSetting extends DomainObject {

	/**
	 * URL
	 */
	private URL url;
	
	/**
	 * サイズと位置
	 */
	private SizeAndPosition sizeAndPosition;
	
	/**
	 * 文字の設定
	 */
	private FontSetting fontSetting;
	
	/**
	 * リンク内容
	 */
	private Optional<DisplayName> linkContent;
}
