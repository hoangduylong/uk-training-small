package nts.uk.ctx.basic.dom.training.jobtitle;

import java.util.List;
import java.util.Optional;



public interface JobTitleRepositoryTraining {
	/**
	 * Get list of JobTitle
	 */
	List<JobTitleTraining> findAll();

	/**
	 * Find JobTitle by JobTitleCode and JobTitleName
	 * @param jobTitleCode
	 * @param jobTitleName
	 */
	Optional<JobTitleTraining> find(String jobTitleCode);

	/**
	 * Add new JobTitle
	 * @param jobTitleTraining
	 */
	void add(JobTitleTraining jobTitleTraining);

	/**
	 * Update JobTitle information
	 * @param jobTitleTraining
	 */
	void update(JobTitleTraining jobTitleTraining);



	
}
