package nts.uk.ctx.sys.auth.dom.grant.service;


import java.util.List;

import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;

public interface RoleIndividualComService {
	List<RoleIndividualGrant> selectByRoleType( int roleType);
	
	
	
}
