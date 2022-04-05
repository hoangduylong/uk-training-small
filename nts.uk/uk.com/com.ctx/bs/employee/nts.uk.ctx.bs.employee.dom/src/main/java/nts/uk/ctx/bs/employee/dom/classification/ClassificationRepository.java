/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.classification;

import java.util.List;
import java.util.Optional;

/**
 * The Interface ClassificationRepository.
 */
public interface ClassificationRepository {
	
	/**
	 * Find classification.
	 *
	 * @param companyId the company id
	 * @param classificationCode the classification code
	 * @return the optional
	 */
	Optional<Classification> findClassification(String companyId, String classificationCode);
	
	/**
	 * Adds the.
	 *
	 * @param managementCategory the management category
	 */
	void add(Classification managementCategory);
	
	/**
	 * Update.
	 *
	 * @param managementCategory the management category
	 */
	void update(Classification managementCategory);
	
	/**
	 * Remove.
	 *
	 * @param companyId the company id
	 * @param classificationCode the classification code
	 */
	void remove(String companyId, String classificationCode);
	
	/**
	 * Gets the all management category.
	 *
	 * @param companyId the company id
	 * @return the all management category
	 */
	List<Classification> getAllManagementCategory(String companyId);

	/**
	 * Gets the classification by codes.
	 *
	 * @param companyId the company id
	 * @param codes the codes
	 * @return the classification by codes
	 */
	List<Classification> getClassificationByCodes(String companyId, List<String> codes);
}
