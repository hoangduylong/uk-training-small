package nts.uk.ctx.sys.auth.app.find.wplmanagementauthority;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto.WorkPlaceFunctionDto;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceFunctionRepository;


@Stateless
public class WorkPlaceFunctionFinder {

	@Inject 
	private WorkPlaceFunctionRepository repo;
	
	/**
	 * get all WorkPlaceFunction
	 * @return
	 */
	public List<WorkPlaceFunctionDto> getAllWorkPlaceFunction(){
		List<WorkPlaceFunctionDto> data =repo.getAllWorkPlaceFunction().stream()
				.map(c->WorkPlaceFunctionDto.fromDomain(c)).collect(Collectors.toList());
		if(data.isEmpty())
			return Collections.emptyList();
		return data;
	}
	/**
	 * get WorkPlaceFunction by functionNo
	 * @param functionNo
	 * @return
	 */
	public WorkPlaceFunctionDto getWorkPlaceFunctionById(int functionNo){
		Optional<WorkPlaceFunctionDto> data = repo.getWorkPlaceFunctionById(functionNo).map(c->WorkPlaceFunctionDto.fromDomain(c));
		if(data.isPresent())
			return data.get();
		return null;
	}
	
}
