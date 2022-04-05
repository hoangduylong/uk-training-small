package nts.uk.ctx.sys.portal.app.find.webmenu;

import lombok.Data;

@Data
public class MenuCodeDto {

	private String companyId;
	
	private String menuCode;

	public MenuCodeDto(String companyId, String menuCode) {
		this.companyId = companyId;
		this.menuCode = menuCode;
	}
}
