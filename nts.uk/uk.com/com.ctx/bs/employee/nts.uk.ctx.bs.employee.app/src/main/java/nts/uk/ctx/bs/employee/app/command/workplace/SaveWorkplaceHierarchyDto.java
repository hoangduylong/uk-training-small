package nts.uk.ctx.bs.employee.app.command.workplace;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaveWorkplaceHierarchyDto {
	
	/** The workplace id. */
	private String workplaceId;
	
	/** The hist id. */
	private String histId;
	
	/** The hierarchy cd. */
	private String hierarchyCode;
	
	

}
