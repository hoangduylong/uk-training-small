package nts.uk.ctx.sys.auth.app.find.wplmanagementauthority;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto.InputWorkPlaceAuthority;
import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto.WorkPlaceAuthorityDto;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthorityRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class WorkPlaceAuthorityFinder {
	@Inject
	private WorkPlaceAuthorityRepository repo;
	
	/**
	 * get list WorkPlaceAuthority by companyId
	 * @param companyId
	 * @return
	 */
	public List<WorkPlaceAuthorityDto> getAllWorkPlaceAuthority(){
		String companyID = AppContexts.user().companyId();
		List<WorkPlaceAuthorityDto> data = repo.getAllWorkPlaceAuthority(companyID).stream()
				.map(c->WorkPlaceAuthorityDto.fromDomain(c)).collect(Collectors.toList());
		if(data.isEmpty())
			return Collections.emptyList();
		return data;
	}
	/**
	 * get list WorkPlaceAuthority by roleId
	 * @param companyId
	 * @param functionNo
	 * @return
	 */
	public List<WorkPlaceAuthorityDto> getAllWorkPlaceAuthorityByRoleId(String roleId){
		String companyID = AppContexts.user().companyId();
		List<WorkPlaceAuthorityDto> data = repo.getAllWorkPlaceAuthorityByRoleId(companyID, roleId).stream()
				.map(c->WorkPlaceAuthorityDto.fromDomain(c)).collect(Collectors.toList());
		if(data.isEmpty())
			return Collections.emptyList();
		return data;
	}
	/**
	 * get WorkPlaceAuthority by id
	 * @param companyId
	 * @param roleId
	 * @param functionNo
	 * @return
	 */
	public WorkPlaceAuthorityDto getWorkPlaceAuthorityById(InputWorkPlaceAuthority inputWorkPlaceAuthority){
		String companyID = AppContexts.user().companyId();
		Optional<WorkPlaceAuthorityDto> data = repo.getWorkPlaceAuthorityById(companyID, 
				inputWorkPlaceAuthority.getRoleId(), inputWorkPlaceAuthority.getFunctionNo())
				.map(c->WorkPlaceAuthorityDto.fromDomain(c));
		if(data.isPresent())
			return data.get();
		return null;
	}
}
