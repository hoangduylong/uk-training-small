package nts.uk.ctx.sys.portal.app.command.titlemenu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.portal.dom.titlemenu.TitleMenu;
import nts.uk.shr.com.context.AppContexts;

@Getter	
@Setter
@NoArgsConstructor
@AllArgsConstructor	
/**
 * @author hieult
 */
public class CreateTitleMenuCommand {

	private String titleMenuCD;

	private String name;

	private String layoutID;

	public TitleMenu toDomain() {
		return TitleMenu.createFromJavaType(AppContexts.user().companyId(), this.titleMenuCD, this.name, this.layoutID);
	}
}