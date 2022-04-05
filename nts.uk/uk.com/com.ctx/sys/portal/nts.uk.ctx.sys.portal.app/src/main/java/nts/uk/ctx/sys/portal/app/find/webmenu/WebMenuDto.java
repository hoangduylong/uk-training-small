package nts.uk.ctx.sys.portal.app.find.webmenu;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WebMenuDto {
	
	private String companyId;

	private String webMenuCode;

	private String webMenuName;

	private int defaultMenu;

	private List<MenuBarDto> menuBars;

}
