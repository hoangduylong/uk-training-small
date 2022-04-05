package nts.uk.ctx.sys.auth.app.find.grant.roleindividual;

import java.util.List;

import lombok.Value;
import nts.arc.enums.EnumConstant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;

@Value
public class RoleIndividualComDto {
	private List<EnumConstant> enumRoleType;
	private List<RoleIndividualGrant> listGrant;
}
