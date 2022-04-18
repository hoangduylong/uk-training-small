package nts.uk.ctx.basic.app.find.training.position;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.basic.app.find.training.position.dto.PositionDto;
import nts.uk.ctx.basic.dom.training.position.PositionTraining;
import nts.uk.ctx.basic.dom.training.position.PositionRepositoryTraining;

// Convert position domain into dto

@Stateless
public class PositionFinder {
	
	@Inject
	private PositionRepositoryTraining positionRepository;
	
	
	// get all positions
	public List<PositionDto> findAll() {
		List<PositionDto> result = new ArrayList<>();
		
		// get position list
		List<PositionTraining> positionList = this.positionRepository.findAll();

		positionList.forEach(position -> {
			// convert domain into dto
			PositionDto positionDto = new PositionDto(position.getPositionCode().v(), 
													  position.getPositionName().v(), 
													  position.getPositionOrder());
			
			// add position dto to result list
			result.add(positionDto);
		});	
		return result;
	}
	
	
	// find position by position's code
	public PositionDto findByPositionCode(String positionCode) {
		Optional<PositionTraining> position = this.positionRepository.findByPositionCode(positionCode);

		if(position.isPresent()) {
			PositionDto positionDto = new PositionDto(position.get().getPositionCode().v(), 
					 								  position.get().getPositionName().v(), 
					 								  position.get().getPositionOrder());
			return positionDto;
		}
		return null;
	}

}

