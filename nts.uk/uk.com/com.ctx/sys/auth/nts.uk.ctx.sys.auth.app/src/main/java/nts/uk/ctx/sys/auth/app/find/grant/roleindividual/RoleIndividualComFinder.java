package nts.uk.ctx.sys.auth.app.find.grant.roleindividual;

import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.arc.enums.EnumAdaptor;
import nts.arc.enums.EnumConstant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.grant.service.RoleIndividualComService;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
@Stateless
public class RoleIndividualComFinder {
	
	@Inject
	private RoleIndividualComService roleIndividualComService;
	
	public RoleIndividualComDto getScreenResult(int roleType){
		// Get List Enum ComboBox
		List<EnumConstant> listRoleType = EnumAdaptor.convertToValueNameList(RoleType.class);
		//Get List RoleIndividualCom
		List<RoleIndividualGrant> listRoleIndividualGrant = roleIndividualComService.selectByRoleType(roleType);
		return new RoleIndividualComDto(listRoleType, listRoleIndividualGrant);
		
	}

}
