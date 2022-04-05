/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.jobtitle;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.app.find.jobtitle.dto.JobTitleFindDto;
import nts.uk.ctx.bs.employee.app.find.jobtitle.dto.JobTitleItemDto;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitle;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfo;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class JobTitleFinder.
 */
@Stateless
public class JobTitleFinder {

	/** The repository. */
	@Inject
	private JobTitleRepository jobTitleRepository;

	@Inject
	private JobTitleInfoRepository jobTitleInfoRepository;

	/**
	 * Find job history by job id.
	 *
	 * @param jobTitleId
	 *            the job title id
	 * @return the job title find dto
	 */
	public JobTitleFindDto findJobHistoryByJobId(String jobTitleId) {
		String companyId = AppContexts.user().companyId();
		Optional<JobTitle> opJobTitle = this.jobTitleRepository.findByJobTitleId(companyId, jobTitleId);

		if (opJobTitle.isPresent()) {
			JobTitleFindDto dto = new JobTitleFindDto();
			opJobTitle.get().saveToMemento(dto);
			return dto;
		}
		return null;
	}

	/**
	 * Find all.
	 *
	 * @return the list
	 */
	public List<JobTitleItemDto> findAll(GeneralDate baseDate) {
		String companyId = AppContexts.user().companyId();
		List<JobTitleInfo> jobs = this.jobTitleInfoRepository.findAll(companyId, baseDate);

		return jobs.stream()
				.map(job -> JobTitleItemDto.builder()
						.id(job.getJobTitleId())
						.code(job.getJobTitleCode().v())
						.name(job.getJobTitleName().v())
						.build())
				.collect(Collectors.toList());
	}
	
	public List<String> findNamesByIds(List<String> ids) {
		String companyId = AppContexts.user().companyId();
		return this.jobTitleInfoRepository.findByIds(companyId, ids, GeneralDate.today()).stream().map(item -> item.getJobTitleName().v()).collect(Collectors.toList());
	}
}
