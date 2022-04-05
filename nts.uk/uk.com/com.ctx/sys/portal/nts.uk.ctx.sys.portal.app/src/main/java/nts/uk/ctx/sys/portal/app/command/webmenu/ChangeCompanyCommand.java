package nts.uk.ctx.sys.portal.app.command.webmenu;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangeCompanyCommand {
	
	private String companyId;
	
	private String companyName;
	
	private String personName;

	private String screenID;
	
	public ChangeCompanyCommand(String companyId) {
		this.companyId = companyId;
	}
}
