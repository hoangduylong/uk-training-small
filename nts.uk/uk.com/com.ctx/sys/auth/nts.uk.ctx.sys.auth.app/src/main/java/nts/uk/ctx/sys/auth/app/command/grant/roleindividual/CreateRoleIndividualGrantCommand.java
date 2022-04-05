package nts.uk.ctx.sys.auth.app.command.grant.roleindividual;

import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;

/**
 * 
 * @author hieult
 *
 */
@NoArgsConstructor
public class CreateRoleIndividualGrantCommand extends RoleIndividualGrantBaseCommand {
	
	@Setter
	private String roleID;
	
	public RoleIndividualGrant toDomain() {
		return RoleIndividualGrant.createFromJavaType(userID, this.roleID, companyID, roleType, startValidPeriod, endValidPeriod);
	}
	
	public RoleIndividualGrant toDomain(String roleID) {
		return RoleIndividualGrant.createFromJavaType(userID, roleID, companyID, roleType, startValidPeriod, endValidPeriod);
	}

}
