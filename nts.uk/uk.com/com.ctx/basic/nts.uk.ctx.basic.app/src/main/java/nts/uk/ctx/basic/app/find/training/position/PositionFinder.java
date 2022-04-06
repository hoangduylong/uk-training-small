package nts.uk.ctx.basic.app.find.training.position;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.basic.app.find.training.position.dto.PositionDto;
import nts.uk.ctx.basic.dom.training.position.Position;
import nts.uk.ctx.basic.dom.training.position.PositionRepository;


@Stateless
public class PositionFinder {
	
	@Inject
	private PositionRepository positionRepository;
	/**
	 * find all position
	 * @return
	 */
	
	public List<PositionDto> findAll() {
		List<PositionDto> result = new ArrayList<>();
		
		// get position list
		List<Position> positionList = this.positionRepository.findAll();

		positionList.forEach(position -> {
			// convert domain into Dto
			PositionDto positionDto = new PositionDto(position.getPositionCode().v(), 
													  position.getPositionName().v(), 
													  position.getPositionOrder());
			
			// add Dto to result list
			result.add(positionDto);
		});	
		
		return result;
	}
	
	
	/**
	 * find position by position code
	 * @param positionCode
	 * @return
	 */
	public PositionDto findByPositionCode(String positionCode) {
		Optional<Position> position = this.positionRepository.findByPositionCode(positionCode);
		
		if(position.isPresent()) {
			PositionDto positionDto = new PositionDto(position.get().getPositionCode().v(), 
					 								  position.get().getPositionName().v(), 
					 								  position.get().getPositionOrder());
			 
			return positionDto;
		}
		
		return null;
	}

}

