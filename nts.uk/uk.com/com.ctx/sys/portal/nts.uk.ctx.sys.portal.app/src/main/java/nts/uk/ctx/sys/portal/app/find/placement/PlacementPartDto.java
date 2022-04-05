package nts.uk.ctx.sys.portal.app.find.placement;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.portal.dom.enums.TopPagePartType;
import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenu;
import nts.uk.ctx.sys.portal.dom.placement.externalurl.ExternalUrl;

/**
 * @author LamDT
 */
@Getter
@Setter
public class PlacementPartDto {

	/** Width */
	private int width;

	/** Height */
	private int height;
	
	/** TopPage Part GUID */
	private String topPagePartID;
	
	/** Code */
	private String topPageCode;

	/** Name */
	private String topPageName;

	/** TopPage Part Type */
	private Integer type;
	
	/** External Url */
	private String url;
	
	/* FlowMenu */
	private String fileID;
	private Integer defClassAtr;
	
	protected PlacementPartDto(int width, int height, String topPagePartID, String code, String name, Integer type, String url, String fileID, Integer defClassAtr) {
		this.width = width;
		this.height = height;
		this.topPagePartID = topPagePartID;
		this.topPageCode = code;
		this.topPageName = name;
		this.type = type;
		this.url = url;
		this.fileID = fileID;
		this.defClassAtr = defClassAtr;
	}
	
	public static PlacementPartDto createExternalUrl(ExternalUrl externalUrl) {
		return new PlacementPartDto(externalUrl.getWidth().v(), externalUrl.getHeight().v(), null, null, null, TopPagePartType.ExternalUrl.value, externalUrl.getUrl().v(), null, null);
	}
	
	public static PlacementPartDto createFromTopPagePart(FlowMenu flowMenu) {
		return new PlacementPartDto(0, 0,
				"", flowMenu.getCode().v(), flowMenu.getName().v(),
				TopPagePartType.FlowMenu.value, null,
					flowMenu.getFileID(), flowMenu.getDefClassAtr().value);
	}
	
}