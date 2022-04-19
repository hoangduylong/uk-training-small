package nts.uk.ctx.basic.infra.repository.training.jobtitle;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingHistory;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingHistoryPK;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingJobTitle;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingJobTitlePK;

@Stateless
public class JpaJobTitleRepositoryTraining extends JpaRepository implements JobTitleRepositoryTraining {

	@Inject
	private static final String SELECT_ALL = "SELECT a FROM TrainingJobTitle a";
	
	/**
	 * find all JobTitle Training
	 */
	@Override
	public List<JobTitleTraining> findAll() {
		List<JobTitleTraining> kq = this.queryProxy().query(SELECT_ALL, TrainingJobTitle.class)
				.getList(x -> TrainingJobTitle.toDomain(x));
		return kq;
	}
	
	/**
	 * find JobTitleTraining by JobTitleCode
	 */
	@Override
	public Optional<JobTitleTraining> find(String jobTitleCode) {
		return this.queryProxy().find(new TrainingJobTitlePK(jobTitleCode), TrainingJobTitle.class)
				.map(x -> TrainingJobTitle.toDomain(x));
	}
	
	/**
	 * add JobTitleTraining to db
	 */
	@Override
	public void add(JobTitleTraining jobTitleTraining) {
		this.commandProxy().insert(this.toJobTitleEntity(jobTitleTraining));
	}
	
	/**
	 * update JobTitleTraining to db
	 */
	@Override
	public void update(JobTitleTraining jobTitleTraining) {
		TrainingJobTitlePK pk = new TrainingJobTitlePK(jobTitleTraining.getJobTitleCodeTraining().v());
		TrainingJobTitle entity = this.queryProxy().find(pk, TrainingJobTitle.class).get();

		entity.setTrainingJobTitlePK(pk);
		entity.setPositionCd(jobTitleTraining.getPositionCodeTraining().v());
		entity.setAsManager(jobTitleTraining.isTreatAsAManager() ? 1 : 0);
		entity.setIsAbrogated(jobTitleTraining.isAbrogated() ? 1 : 0);
		entity.setLstTrainingHistory(toListHistoryEntity(jobTitleTraining));

		this.commandProxy().update(entity);
	}
	
	/**
	 * convert domain HistoryTraining to entity
	 * @param jobTitleTraining
	 * @return entity TrainingHistory
	 */
	public List<TrainingHistory> toListHistoryEntity(JobTitleTraining jobTitleTraining) {

		List<TrainingHistory> listEntity = jobTitleTraining.getHistoryTrainings().stream().map(history -> {
			TrainingHistoryPK pk = new TrainingHistoryPK(history.getHistoryId());

			TrainingHistory entity = this.queryProxy().find(pk, TrainingHistory.class).orElse(new TrainingHistory());

			entity.setTrainingHistoryPK(pk);
			entity.setJobCd(history.getJobTitleCodeTraining().v());
			entity.setJobName(history.getJobTitleNameTraining().v());
			entity.setStartDate(history.getStartDate());
			entity.setEndDate(history.getEndDate());
			return entity;
		}).collect(Collectors.toList());

		return listEntity;
	}
	
	/**
	 * convert domain JobTitleTraining to entity
	 * @param jobTitleTraining
	 * @return entity TrainingJobTitle
	 */
	public TrainingJobTitle toJobTitleEntity(JobTitleTraining jobTitleTraining) {
		TrainingJobTitlePK pk = new TrainingJobTitlePK(jobTitleTraining.getJobTitleCodeTraining().v());

		TrainingJobTitle entity = new TrainingJobTitle(pk,
				jobTitleTraining.getPositionCodeTraining().v(),
				jobTitleTraining.isTreatAsAManager() ? 1 : 0,
				jobTitleTraining.isAbrogated() ? 1 : 0,
				this.toListHistoryEntity(jobTitleTraining));

		return entity;
	}
}
