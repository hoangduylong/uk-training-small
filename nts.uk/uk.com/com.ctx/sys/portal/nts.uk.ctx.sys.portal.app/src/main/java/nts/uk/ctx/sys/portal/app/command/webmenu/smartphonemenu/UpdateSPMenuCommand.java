package nts.uk.ctx.sys.portal.app.command.webmenu.smartphonemenu;

import java.util.List;

import lombok.Data;
import nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu.SPMenuEmpDto;

/**
 * 
 * @author sonnh1
 *
 */
@Data
public class UpdateSPMenuCommand {
	private List<SPMenuEmpDto> lstSPMenuEmp;
}
