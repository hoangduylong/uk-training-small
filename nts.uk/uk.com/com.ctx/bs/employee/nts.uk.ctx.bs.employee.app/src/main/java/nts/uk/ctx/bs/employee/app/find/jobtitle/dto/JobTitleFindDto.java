/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.jobtitle.dto;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Data;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleSetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistory;

/**
 * The Class JobTitleFindDto.
 */
@Data
public class JobTitleFindDto implements JobTitleSetMemento {

	/** The company id. */
	private String companyId;

	/** The job title id. */
	private String jobTitleId;

	/** The job title history. */
	private List<JobTitleHistoryFindDto> jobTitleHistory;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleSetMemento#setCompanyId(nts.
	 * uk.ctx.bs.employee.dom.common.CompanyId)
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		this.companyId = companyId.v();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleSetMemento#setJobTitleId(nts.
	 * uk.ctx.bs.employee.dom.jobtitle.JobTitleId)
	 */
	@Override
	public void setJobTitleId(String jobTitleId) {
		this.jobTitleId = jobTitleId;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleSetMemento#setJobTitleHistory
	 * (java.util.List)
	 */
	@Override
	public void setJobTitleHistory(List<JobTitleHistory> jobTitleHistory) {
		this.jobTitleHistory = jobTitleHistory.stream().map(item -> {
			JobTitleHistoryFindDto dto = new JobTitleHistoryFindDto();
			item.saveToMemento(dto);
			return dto;
		}).collect(Collectors.toList());
	}
}
