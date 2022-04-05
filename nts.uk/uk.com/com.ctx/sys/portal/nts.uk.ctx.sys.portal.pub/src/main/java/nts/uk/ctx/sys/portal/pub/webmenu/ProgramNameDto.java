package nts.uk.ctx.sys.portal.pub.webmenu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ProgramNameDto {

	private String companyId;
	
	private String programId;
	
	private String screenId;
	
	private String queryString;
	
	private String displayName;
}
