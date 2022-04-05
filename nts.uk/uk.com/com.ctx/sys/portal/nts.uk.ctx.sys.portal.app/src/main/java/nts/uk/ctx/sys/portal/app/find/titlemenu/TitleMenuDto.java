/**
 * @author hieult
 */
package nts.uk.ctx.sys.portal.app.find.titlemenu;
import lombok.Value;
import nts.uk.ctx.sys.portal.dom.titlemenu.TitleMenu;

@Value
public class TitleMenuDto {
	
	private String companyID;
	
	private String titleMenuCD;
		
	private String name;
	
	private String layoutID;
	
	public static  TitleMenuDto fromDomain (TitleMenu domain ) {
		return new TitleMenuDto (
				domain.getCompanyID(),
				domain.getTitleMenuCD().v(),
				domain.getName().v(),
				domain.getLayoutID());
		}
	
}
