package nts.uk.ctx.basic.app.find.training.jobtitle;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
					jobTitle.getPositionCodeTraining().v(),
					jobTitle.getJobTitleCodeTraining().v(),
					this.toDto(jobTitle.getHistoryTrainings()),
					jobTitle.isAbrogated(),
					jobTitle.isTreatAsAManager());
			
			// add Dto to result list
			result.add(jobTitleDtoTraining);
		});
		return result;
	}
	
	/**
	 * find Job Title Dto by Job Code
	 * @param jobTitleCode
	 * @return Job Title Dto
	 */
	public JobTitleDtoTraining find(String jobTitleCode) {
		Optional<JobTitleTraining> jobTitle = this.jobTitleRepositoryTraining.find(jobTitleCode);
		
		if(jobTitle.isPresent()) {
			throw new BusinessException("Msg_102");
		}
		
		return new JobTitleDtoTraining(jobTitle.get().getJobTitleCodeTraining().v(), 
				jobTitleCode,
				this.toDto(jobTitle.get().getHistoryTrainings()), 
				jobTitle.get().isAbrogated(), 
				jobTitle.get().isTreatAsAManager());
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

