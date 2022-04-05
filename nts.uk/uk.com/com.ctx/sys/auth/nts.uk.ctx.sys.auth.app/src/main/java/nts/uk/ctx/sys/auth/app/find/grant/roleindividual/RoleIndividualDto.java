package nts.uk.ctx.sys.auth.app.find.grant.roleindividual;

import java.util.List;

import lombok.Value;
import nts.uk.ctx.sys.auth.app.find.grant.roleindividual.dto.RoleIndividualGrantDto;

@Value
public class RoleIndividualDto {
   
	private String companyIDSysAdmin; 
		
	private List<RoleIndividualGrantDto> listGrantDto; 
}   
