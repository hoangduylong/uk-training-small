package nts.uk.ctx.basic.dom.training.position;

import java.util.List;
import java.util.Optional;

// Interface PositionRepositoryTraining

public interface PositionRepositoryTraining {
	
	// get all positions
	List<PositionTraining> findAll();
	
	// find position by position's code
	Optional<PositionTraining> findByPositionCode(String positionCode);

	// add new position
	void add(PositionTraining position);

	// update position
	void update(PositionTraining position);

	// remove position by position's code
	void remove(String positionCode);
	
	// update all positions' order
	void updateOrder(List<PositionTraining> positionList);
	
}