package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu;

import java.util.List;
import java.util.Optional;

import lombok.Data;
import lombok.EqualsAndHashCode;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartCode;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartName;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.フローメニュー作成.フローメニュー作成
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class CreateFlowMenu extends AggregateRoot {
	
	/**
	 * フローメニューコード
	 */
	private TopPagePartCode flowMenuCode;
	
	/**
	 * フローメニュー名称
	 */
	private TopPagePartName flowMenuName;
	
	/**
	 * フローメニューレイアウト
	 */
	private Optional<FlowMenuLayout> flowMenuLayout;
	
	/**
	 * 会社ID
	 */
	private String cid;
	
	public static CreateFlowMenu createFromMemento(MementoGetter memento) {
		CreateFlowMenu domain = new CreateFlowMenu();
		domain.getMemento(memento);
		return domain;
	}
	
	public void getMemento(MementoGetter memento) {
		this.flowMenuCode = new TopPagePartCode(memento.getFlowMenuCode());
		this.cid = memento.getCid();
		this.flowMenuName = new TopPagePartName(memento.getFlowMenuName());
		this.flowMenuLayout = memento.getFileId() != null 
				? Optional.of(FlowMenuLayout.createFromMemento(memento))
				: Optional.empty();
	}
	
	public void setMemento(MementoSetter memento, String contractCode) {
		memento.setCid(this.cid);
		memento.setFlowMenuCode(this.flowMenuCode.v());
		memento.setFlowMenuName(this.flowMenuName.v());
		memento.setContractCode(contractCode);
		this.flowMenuLayout.ifPresent(layout -> layout.setMemento(memento, contractCode));
	}
	
	public static interface MementoGetter {
		String getFlowMenuCode();
		String getFlowMenuName();
		String getCid();
		String getFileId();
		List<MenuSetting> getMenuSettings();
		List<ArrowSetting> getArrowSettings();
		List<FileAttachmentSetting> getFileAttachmentSettings();
		List<ImageSetting> getImageSettings();
		List<LabelSetting> getLabelSettings();
		List<LinkSetting> getLinkSettings();
	}
	
	public static interface MementoSetter {
		void setFlowMenuCode(String flowMenuCode);
		void setFlowMenuName(String flowMenuName);
		void setContractCode(String contractCode);
		void setCid(String cid);
		void setFileId(String fileId);
		void setMenuSettings(List<MenuSetting> menuSettings, String contractCode);
		void setArrowSettings(List<ArrowSetting> arrowSettings, String contractCode);
		void setFileAttachmentSettings(List<FileAttachmentSetting> fileAttachmentSettings, String contractCode);
		void setImageSettings(List<ImageSetting> imageSettings, String contractCode);
		void setLabelSettings(List<LabelSetting> labelSettings, String contractCode);
		void setLinkSettings(List<LinkSetting> linkSettings, String contractCode);
	}
}
