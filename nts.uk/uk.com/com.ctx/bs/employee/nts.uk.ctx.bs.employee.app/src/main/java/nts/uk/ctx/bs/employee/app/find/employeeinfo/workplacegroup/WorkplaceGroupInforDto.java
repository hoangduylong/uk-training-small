package nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter	
@AllArgsConstructor
public class WorkplaceGroupInforDto {
	
	private String workplaceGroupID;
	
	private String workplaceGroupCode;
	
	private String workplaceGroupName;
	
	private boolean isPresent;
}
