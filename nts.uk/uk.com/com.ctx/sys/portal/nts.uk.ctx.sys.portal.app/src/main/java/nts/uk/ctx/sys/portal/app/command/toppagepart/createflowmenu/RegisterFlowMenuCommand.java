package nts.uk.ctx.sys.portal.app.command.toppagepart.createflowmenu;

import java.util.Collections;
import java.util.List;

import lombok.Data;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.ArrowSetting;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenu;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.FileAttachmentSetting;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.ImageSetting;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.LabelSetting;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.LinkSetting;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.MenuSetting;

@Data
public class RegisterFlowMenuCommand implements CreateFlowMenu.MementoGetter {

	/**
	 * フローメニューコード
	 */
	private String flowMenuCode;
	
	/**
	 * フローメニュー名称
	 */
	private String flowMenuName;
	
	/**
	 * 会社ID
	 */
	private String cid;

	@Override
	public String getFileId() {
		// NOT USED
		return null;
	}

	@Override
	public List<MenuSetting> getMenuSettings() {
		// NOT USED
		return Collections.emptyList();
	}

	@Override
	public List<ArrowSetting> getArrowSettings() {
		// NOT USED
		return Collections.emptyList();
	}

	@Override
	public List<FileAttachmentSetting> getFileAttachmentSettings() {
		// NOT USED
		return Collections.emptyList();
	}

	@Override
	public List<ImageSetting> getImageSettings() {
		// NOT USED
		return Collections.emptyList();
	}

	@Override
	public List<LabelSetting> getLabelSettings() {
		// NOT USED
		return Collections.emptyList();
	}

	@Override
	public List<LinkSetting> getLinkSettings() {
		// NOT USED
		return Collections.emptyList();
	}
}
