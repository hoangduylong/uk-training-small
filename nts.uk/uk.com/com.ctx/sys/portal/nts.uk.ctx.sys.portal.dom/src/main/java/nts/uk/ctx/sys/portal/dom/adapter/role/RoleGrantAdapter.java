package nts.uk.ctx.sys.portal.dom.adapter.role;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.portal.dom.adapter.roleset.RoleSetDto;

public interface RoleGrantAdapter {

	List<String> getRoleId(String userId);
	
	Optional<String> getRoleId(String userId, String companyId, int roleType);
	
	List<RoleDto> findRole(String roleId);
	
	Optional<RoleSetGrantedPersonDto> getRoleSetPersonGrant(String employeeId);
	
	Optional<AffJobHistoryDto> getAffJobHist(String employeeId, GeneralDate baseDate);
	
	Optional<RoleSetGrantedJobTitleDetailDto> getRoleSetJobTitleGrant(String companyId, String jobTitleId);
	
	Optional<DefaultRoleSetDto> getDefaultRoleSet(String companyId);
	
	Optional<RoleSetDto> getRoleSet(String companyId, String roleSetCd);
	
	LoginResponsibleDto getLoginResponsible();
}
