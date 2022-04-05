/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.adapter.workplace;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class AffWorkplaceHistImport.
 */
@Getter
@Builder
@Setter
public class AffWorkplaceHistImport {

	/** The date range. */
	// 配属期間
	private DatePeriod dateRange;

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The workplace id. */
	// 職場ID
	private String workplaceId;

	/** The workplace code. */
	private String workplaceCode;

	/** The workplace name. */
	private String workplaceName;

	/** The wkp display name. */
	// 職場表示名
	private String wkpDisplayName;

	/**
	 * Instantiates a new aff workplace hist import.
	 */
	public AffWorkplaceHistImport() {
		super();
	}

	/**
	 * Instantiates a new aff workplace hist import.
	 *
	 * @param dateRange the date range
	 * @param employeeId the employee id
	 * @param workplaceId the workplace id
	 * @param workplaceCode the workplace code
	 * @param workplaceName the workplace name
	 * @param wkpDisplayName the wkp display name
	 */
	public AffWorkplaceHistImport(DatePeriod dateRange, String employeeId, String workplaceId, String workplaceCode,
			String workplaceName, String wkpDisplayName) {
		super();
		this.dateRange = dateRange;
		this.employeeId = employeeId;
		this.workplaceId = workplaceId;
		this.workplaceCode = workplaceCode;
		this.workplaceName = workplaceName;
		this.wkpDisplayName = wkpDisplayName;
	}

}
