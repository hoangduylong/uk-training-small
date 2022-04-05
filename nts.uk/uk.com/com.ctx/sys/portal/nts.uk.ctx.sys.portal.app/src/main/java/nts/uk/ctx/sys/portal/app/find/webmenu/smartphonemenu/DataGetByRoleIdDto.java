package nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu;

import java.util.List;

import lombok.Data;

/**
 * 
 * @author sonnh1
 *
 */
@Data
public class DataGetByRoleIdDto {
	private String roleId;
	private List<String> lstMenuCd;
}
