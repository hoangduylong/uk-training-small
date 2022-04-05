package nts.uk.ctx.sys.auth.app.command.grant.roleindividual;

import lombok.Data;

@Data
public class CreateRoleIndividualGrantCommandResult {
	
	private final String companyID;
	
	private final String userID;
	
	private final int roleType;
}
