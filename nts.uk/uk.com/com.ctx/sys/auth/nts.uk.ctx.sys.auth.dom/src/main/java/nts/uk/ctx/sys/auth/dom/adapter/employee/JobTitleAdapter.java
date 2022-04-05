package nts.uk.ctx.sys.auth.dom.adapter.employee;

import java.util.List;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.employee.dto.JobTitleValueImport;
import nts.uk.ctx.sys.auth.dom.employee.dto.SimpleJobTitleImport;

public interface JobTitleAdapter {
	/**
	 * Find job title by sid.
	 *
	 * @param employeeId
	 *            the employee id
	 * @return the list
	 */
	// RequestList #17
	List<JobTitleValueImport> findJobTitleBySid(String employeeId);

	/**
	 * Find job title by sid.
	 *
	 * @param employeeId
	 *            the employee id
	 * @param baseDate
	 *            the base date
	 * @return the list
	 */
	// RequestList #33
	JobTitleValueImport findJobTitleBySid(String employeeId, GeneralDate baseDate);

	/**
	 * Find job title by position id.
	 *
	 * @param companyId
	 *            the company id
	 * @param positionId
	 *            the position id
	 * @param baseDate
	 *            the base date
	 * @return the list
	 */
	// RequestList #67-1
	JobTitleValueImport findJobTitleByPositionId(String companyId, String positionId, GeneralDate baseDate);

	/**
	 * Find by base date.
	 *
	 * @param companyId
	 *            the company id
	 * @param baseDate
	 *            the base date
	 * @return the list
	 */
	// RequestList #74
	List<JobTitleValueImport> findAll(String companyId, GeneralDate baseDate);
	
	/**
	 * Find by ids.
	 *
	 * @param companyId the company id
	 * @param jobIds the job ids
	 * @param baseDate the base date
	 * @return the list
	 */
	// RequestList #158
	List<SimpleJobTitleImport> findByIds(String companyId, List<String> jobIds,	GeneralDate baseDate);
}
