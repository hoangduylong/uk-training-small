package nts.uk.ctx.basic.dom.training.position;

import java.util.List;
import java.util.Optional;

public interface PositionRepositoryTraining {
	
	// Get list of Position
	List<PositionTraining> findAll();
	
	// Find position by positionCode
	Optional<PositionTraining> findByPositionCode(String positionCode);

	// Add new position
	void add(PositionTraining position);

	// Update position information
	void update(PositionTraining position);

	// Remove a position
	void remove(String positionCode);
	
	// Update position's order
	void updateOrder(List<PositionTraining> positionList);

}