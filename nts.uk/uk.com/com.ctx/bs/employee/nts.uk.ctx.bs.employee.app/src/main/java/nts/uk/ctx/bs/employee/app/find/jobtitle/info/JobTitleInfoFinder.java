/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.jobtitle.info;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.app.find.jobtitle.info.dto.JobTitleInfoFindDto;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfo;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMaster;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMasterRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class JobTitleInfoFinder.
 */
@Stateless
public class JobTitleInfoFinder {

	/** The job title info repository. */
	@Inject
	private JobTitleInfoRepository jobTitleInfoRepository;

	/** The sequence master repository. */
	@Inject
	private SequenceMasterRepository sequenceMasterRepository;

	/**
	 * Find by job id and history id.
	 *
	 * @param jobTitleId
	 *            the job title id
	 * @param historyId
	 *            the history id
	 * @return the job title info find dto
	 */
	public JobTitleInfoFindDto findByJobIdAndHistoryId(String jobTitleId, String historyId) {
		String companyId = AppContexts.user().companyId();
		Optional<JobTitleInfo> opJobTitleInfo = this.jobTitleInfoRepository.find(companyId, jobTitleId, historyId);

		if (opJobTitleInfo.isPresent()) {
			JobTitleInfoFindDto dto = new JobTitleInfoFindDto();
			opJobTitleInfo.get().saveToMemento(dto);

			// Get sequence info
			Optional<SequenceMaster> opSequenceMaster = this.sequenceMasterRepository.findBySequenceCode(companyId,
					dto.getSequenceCode());
			if (opSequenceMaster.isPresent()) {
				opSequenceMaster.get().saveToMemento(dto);
			}

			return dto;
		}
		return null;
	}

	/**
	 * Find by job code.
	 *
	 * @param jobTitleCode
	 *            the job title code
	 * @return the job title info find dto
	 */
	public JobTitleInfoFindDto findByJobCode(String jobTitleCode) {
		String companyId = AppContexts.user().companyId();
		Optional<JobTitleInfo> opJobTitleInfo = this.jobTitleInfoRepository.findByJobCode(companyId, jobTitleCode);

		if (opJobTitleInfo.isPresent()) {
			JobTitleInfoFindDto dto = new JobTitleInfoFindDto();
			opJobTitleInfo.get().saveToMemento(dto);

			// Get sequence info
			Optional<SequenceMaster> opSequenceMaster = this.sequenceMasterRepository.findBySequenceCode(companyId,
					dto.getSequenceCode());
			if (opSequenceMaster.isPresent()) {
				opSequenceMaster.get().saveToMemento(dto);
			}

			return dto;
		}
		return null;
	}
}
