package nts.uk.ctx.basic.dom.training.position;

import java.util.List;
import java.util.Optional;

public interface PositionRepositoryTraining {
	
	/**
	 * Get list of Position
	 * @param positionCode
	 * @return
	 */
	List<PositionTraining> findAll();
	
	/**
	 * Find position by positionCode
	 * @param positionCode
	 * @return
	 */
	Optional<PositionTraining> findByPositionCode(String positionCode);

	/**
	 * Add new position
	 * @param position
	 */
	void add(PositionTraining position);

	/**
	 * Update position information
	 * @param position
	 */
	void update(PositionTraining position);

	/**
	 * Remove a position
	 * @param positionCode
	 */
	void remove(String positionCode);
	
	/**
	 * Update position's order
	 */
	void updateOrder(List<PositionTraining> positionList);
	

}