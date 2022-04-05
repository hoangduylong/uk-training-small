package nts.uk.ctx.sys.auth.app.command.grant.roleindividual;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleIndividualCommand {
	
	private String selectedCompany;
	
	private int selectedRoleType;

}
