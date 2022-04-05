package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import java.util.Optional;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import nts.arc.layer.dom.DomainObject;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.添付ファイル設定
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Builder
public class FileAttachmentSetting extends DomainObject {

	/**
	 * 添付ファイル内容
	 */
	private Optional<DisplayName> linkContent;
	
	/**
	 * 添付ファイルID
	 */
	private String fileId;
	
	/**
	 * サイズと位置
	 */
	private SizeAndPosition sizeAndPosition;
	
	/**
	 * 文字の設定
	 */
	private FontSetting fontSetting;
}
