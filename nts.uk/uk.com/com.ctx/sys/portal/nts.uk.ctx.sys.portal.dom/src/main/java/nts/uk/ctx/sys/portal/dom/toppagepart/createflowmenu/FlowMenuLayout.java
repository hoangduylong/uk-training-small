package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;
import nts.arc.layer.dom.DomainObject;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenu.MementoGetter;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenu.MementoSetter;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.フローメニューレイアウト
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class FlowMenuLayout extends DomainObject {
	
	/**
	 * ファイルID
	 */
	private String fileId; 
	
	/**
	 * メニュー設定
	 */
	private List<MenuSetting> menuSettings;
	
	/**
	 * ラベル設定
	 */
	private List<LabelSetting> labelSettings;
	
	/**
	 * リンク設定
	 */
	private List<LinkSetting> linkSettings;
	
	/**
	 * 添付ファイル設定
	 */
	private List<FileAttachmentSetting> fileAttachmentSettings;
	
	/**
	 * 画像設定
	 */
	private List<ImageSetting> imageSettings;
	
	/**
	 * 矢印設定
	 */
	private List<ArrowSetting> arrowSettings;
	
	public static FlowMenuLayout createFromMemento(MementoGetter memento) {
		FlowMenuLayout domain = new FlowMenuLayout();
		domain.getMemento(memento);
		return domain;
	}
	
	public void getMemento(MementoGetter memento) {
		this.fileId = memento.getFileId();
		this.arrowSettings = memento.getArrowSettings();
		this.fileAttachmentSettings = memento.getFileAttachmentSettings();
		this.imageSettings = memento.getImageSettings();
		this.labelSettings = memento.getLabelSettings();
		this.linkSettings = memento.getLinkSettings();
		this.menuSettings = memento.getMenuSettings();
	}
	
	public void setMemento(MementoSetter memento, String contractCode) {
		memento.setFileId(this.fileId);
		memento.setArrowSettings(this.arrowSettings, contractCode);
		memento.setFileAttachmentSettings(this.fileAttachmentSettings, contractCode);
		memento.setImageSettings(this.imageSettings, contractCode);
		memento.setLabelSettings(this.labelSettings, contractCode);
		memento.setLinkSettings(this.linkSettings, contractCode);
		memento.setMenuSettings(this.menuSettings, contractCode);
	}
}
