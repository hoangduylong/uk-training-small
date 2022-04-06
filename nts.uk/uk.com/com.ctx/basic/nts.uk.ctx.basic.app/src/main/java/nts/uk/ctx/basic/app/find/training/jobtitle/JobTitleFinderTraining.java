package nts.uk.ctx.basic.app.find.training.jobtitle;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.app.find.training.jobtitle.dto.HistoryDtoTraining;
import nts.uk.ctx.basic.app.find.training.jobtitle.dto.JobTitleDtoTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.HistoryTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;


@Stateless
public class JobTitleFinderTraining {
	
	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;
	
	public List<HistoryDtoTraining> toDto(List<HistoryTraining> historyTraining)
	{
		List<HistoryDtoTraining> listDto = historyTraining.stream()
				.map(domain -> {
					HistoryDtoTraining dto = new HistoryDtoTraining(domain.getHistoryId(),
							domain.getJobTitleCodeTraining().v(), 
							domain.getJobTitleNameTraining().v(),
							domain.getStartDate(),
							domain.getEndDate());
					return dto;
				}).collect(Collectors.toList());
		return listDto;
	}
	
	public List<JobTitleDtoTraining> findAll() {
		List<JobTitleDtoTraining> result = new ArrayList<>();
		
		// get jobTitle list
		List<JobTitleTraining> jobTitleList = this.jobTitleRepositoryTraining.findAll();

		jobTitleList.forEach(jobTitle -> {
			
			// convert domain into Dto
			JobTitleDtoTraining jobTitleDtoTraining = new JobTitleDtoTraining(
					jobTitle.getPositionCode().v(),
					jobTitle.getJobTitleCodeTraining().v(),
					toDto(jobTitle.getHistoryTrainings()),
					jobTitle.isAbrogated(),
					jobTitle.isTreatAsAManager());
			
			// add Dto to result list
			result.add(jobTitleDtoTraining);
		});
		return result;
	}
	/**
	 * 
	 * check exists JobTitle
	 */
	public void checkExistsJobTitle() {
		List<JobTitleTraining> jobTitleList = this.jobTitleRepositoryTraining.findAll();
		if(jobTitleList.isEmpty()) {
			throw new BusinessException("ER010");
		}
	}
}

