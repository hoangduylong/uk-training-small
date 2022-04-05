package nts.uk.ctx.sys.auth.app.command.grant.rolesetperson;

import lombok.Value;
import nts.arc.time.GeneralDate;

@Value
public class RoleSetGrantedPersonCommand {

	private String employeeId; 
	private String roleSetCd;
	private GeneralDate startDate;
	private GeneralDate endDate;
	private int mode;
	
}
