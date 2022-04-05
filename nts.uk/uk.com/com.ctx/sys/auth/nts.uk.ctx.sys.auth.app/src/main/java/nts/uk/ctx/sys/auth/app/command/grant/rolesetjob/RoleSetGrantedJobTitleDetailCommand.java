package nts.uk.ctx.sys.auth.app.command.grant.rolesetjob;

import lombok.Value;

/**
 * 
 * @author HungTT
 *
 */

@Value
public class RoleSetGrantedJobTitleDetailCommand {

	private String roleSetCd;
	private String jobTitleId;
	
}
