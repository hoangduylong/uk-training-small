package nts.uk.ctx.sys.auth.app.find.employeeinfo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class EmployeeInfoDto {

	/** The company id. */
	private String companyId;

	/** The employee code. */
	private String employeeCode;

	/** The employee id. */
	private String employeeId;
	
	/** The employee name */
	private String employeeName;

	/** The person Id. */
	private String personId;

	/**
	 * Instantiates a new employee info dto.
	 *
	 * @param companyId the company id
	 * @param employeeCode the employee code
	 * @param employeeId the employee id
	 * @param employeeName the employee name
	 * @param personId the person id
	 */
	public EmployeeInfoDto(String companyId, String employeeCode, String employeeId, String employeeName, String personId) {
		this.companyId = companyId;
		this.employeeCode = employeeCode;
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.personId = personId;
	}

}
