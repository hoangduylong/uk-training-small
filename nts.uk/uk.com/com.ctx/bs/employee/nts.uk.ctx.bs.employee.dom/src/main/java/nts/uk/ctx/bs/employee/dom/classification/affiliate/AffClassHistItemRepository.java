/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.classification.affiliate;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

/**
 * The Interface AffClassHistItemRepository.
 */
public interface AffClassHistItemRepository {
	
	/**
	 * Gets the by history id.
	 *
	 * @param historyId the history id
	 * @return the by history id
	 */
	Optional<AffClassHistItem> getByHistoryId(String historyId);
	
	/**
	 * Adds the.
	 *
	 * @param item the item
	 */
	void add(AffClassHistItem item); 
	
	/**
	 * Update.
	 *
	 * @param item the item
	 */
	void update(AffClassHistItem item); 
	
	/**
	 * Delete.
	 *
	 * @param historyId the history id
	 */
	void delete(String historyId); 
	
	/**
	 * Search classification.
	 *
	 * @param baseDate the base date
	 * @param classificationCodes the classification codes
	 * @return the list
	 */
	List<AffClassHistItem> searchClassification(GeneralDate baseDate,
			List<String> classificationCodes);
	
	/**
	 * Search classification.
	 *
	 * @param employeeIds the employee ids
	 * @param baseDate the base date
	 * @param classificationCodes the classification codes
	 * @return the list
	 */
	List<AffClassHistItem> searchClassification(List<String> employeeIds,
			GeneralDate baseDate, List<String> classificationCodes);
	
	/**
	 * get with history-id list
	 * @param historyIds
	 * @return
	 */
	List<AffClassHistItem> getByHistoryIds(List<String> historyIds);
	/**
	 * add All AffClassHistItem
	 * @param domains
	 */
	void addAll(List<AffClassHistItem> domains); 
	/**
	 * update All AffClassHistItem
	 * @param domains
	 */
	void updateAll(List<AffClassHistItem> domains); 

}
