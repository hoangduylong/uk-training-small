/**
 * 
 */
package nts.uk.ctx.sys.portal.app.find.webmenu;

import java.util.List;

import lombok.Value;
import nts.arc.enums.EnumConstant;
import nts.uk.ctx.sys.portal.app.find.standardmenu.StandardMenuDto;

/**
 * @author hieult
 *
 */
@Value
public class EditMenuBarDto {
	
	private List<EnumConstant> listSelectedAtr;
	
	private List<EnumConstant> listSystem;
	
	private List<EnumConstant> listMenuClassification;
	
	private List<StandardMenuDto> listStandardMenu;
	
	
}