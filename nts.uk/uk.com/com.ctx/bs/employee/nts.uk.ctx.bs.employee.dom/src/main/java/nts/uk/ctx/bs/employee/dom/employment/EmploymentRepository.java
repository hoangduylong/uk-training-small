/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employment;

import java.util.List;
import java.util.Optional;

/**
 * The Interface EmploymentRepository.
 */
public interface EmploymentRepository {

	/**
	 * Find all.
	 *
	 * @param CompanyId the company id
	 * @return the list
	 */
	List<Employment> findAll(String companyId);

	/**
	 * Find by emp codes.
	 *
	 * @param empCodes the emp codes
	 * @return the list
	 */
	List<Employment> findByEmpCodes(String companyId, List<String> empCodes);

	/**
	 * Find employment.
	 *
	 * @param companyCode the company code
	 * @param employmentCode the employment code
	 * @return the optional
	 */
	Optional<Employment> findEmployment(String companyId, String employmentCode);
	
	/**
	 * Insert.
	 *
	 * @param employment the employment
	 */
	void insert(Employment employment);
	
	/**
	 * Update.
	 *
	 * @param employment the employment
	 */
	void update(Employment employment);
	
	
	/**
	 * Removes the.
	 *
	 * @param companyId the company id
	 * @param employmentCode the employment code
	 */
	void remove(String companyId, String employmentCode);

}
