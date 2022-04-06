package nts.uk.ctx.basic.dom.training.position;

import java.util.List;
import java.util.Optional;

public interface PositionRepository {
	
	/**
	 * Get list of Position
	 * @param positionCode
	 * @return
	 */
	List<Position> findAll();
	
	/**
	 * Find position by positionCode
	 * @param positionCode
	 * @return
	 */
	Optional<Position> findByPositionCode(String positionCode);

	/**
	 * Add new position
	 * @param position
	 */
	void add(Position position);

	/**
	 * Update position information
	 * @param position
	 */
	void update(Position position);

	/**
	 * Remove a position
	 * @param positionCode
	 */
	void remove(String positionCode);
	
	/**
	 * Update position's order
	 */
	void updateOrder(List<Position> positionList);
	

}