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
	Optional<PositionTraining> find(String positionCode);

	/**
	 * Add new position
	 * @param positionTraining
	 */
	void add(PositionTraining positionTraining);

	/**
	 * Update position information
	 * @param positionTraining
	 */
	void update(PositionTraining positionTraining);

	/**
	 * Remove a position
	 * @param positionCode
	 */
	void remove(String positionCode);

	

}