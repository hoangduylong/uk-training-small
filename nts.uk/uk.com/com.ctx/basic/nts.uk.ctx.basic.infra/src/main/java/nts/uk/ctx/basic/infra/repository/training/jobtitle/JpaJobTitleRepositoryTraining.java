package nts.uk.ctx.basic.infra.repository.training.jobtitle;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingHistory;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingHistoryPK;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingJobTitle;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingJobTitlePK;

@Stateless
public class JpaJobTitleRepositoryTraining extends JpaRepository implements JobTitleRepositoryTraining {
	@Inject
	/*
	 * private static final String SELECT_ALL =
	 * "SELECT p.positionCd, j.trainingJobTitlePK.jobCd, h.jobName," +
	 * " h.startDate, h.endDate, j.isAbrogated, j.asManager" +
	 * " FROM TrainingJobTitle j" +
	 * " INNER JOIN TrainingPosition p ON j.positionCd = p.positionCd" +
	 * " INNER JOIN TrainingHistory h ON j.trainingJobTitlePK.jobCd = h.jobCd";
	 */

	private static final String SELECT_ALL = "SELECT p.trainingPositionPK.positionCd, j.trainingJobTitlePK.jobCd, h.jobName,"
			+ " h.startDate, h.endDate, j.isAbrogated, j.asManager" + " FROM TrainingJobTitle j"
			+ " INNER JOIN TrainingPosition p ON j.positionCd = p.trainingPositionPK.positionCd"
			+ " INNER JOIN TrainingHistory h ON j.trainingJobTitlePK.jobCd = h.jobCd";
//	@Inject
//	private static final String SELECT_BY_JOB_CD = SELECT_ALL + "WHERE JOB_CD = :jobTitleCode";	

	@Override
	public List<JobTitleTraining> findAll() {
		System.out.println("helloeoituoi5tu34985u798tueroitdrg))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))\n");

		return this.queryProxy().query(SELECT_ALL, TrainingJobTitle.class).getList(x -> TrainingJobTitle.toDomain(x));
	}

	@Override
	public Optional<JobTitleTraining> find(String jobTitleCode) {
		return this.queryProxy().find(jobTitleCode, TrainingJobTitle.class).map(x -> TrainingJobTitle.toDomain(x));
	}

	@Override
	public void add(JobTitleTraining jobTitleTraining) {
		this.commandProxy().insert(this.toJobTitleEntity(jobTitleTraining));
	}

	@Override
	public void update(JobTitleTraining jobTitleTraining) {
		this.commandProxy().update(toJobTitleEntity(jobTitleTraining));
	}

	public List<TrainingHistory> toHistoryEntity(JobTitleTraining jobTitleTraining) {

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

	public TrainingJobTitle toJobTitleEntity(JobTitleTraining jobTitleTraining) {
		TrainingJobTitlePK pk = new TrainingJobTitlePK(jobTitleTraining.getJobTitleCodeTraining().v());

		TrainingJobTitle entity = this.queryProxy().find(pk, TrainingJobTitle.class).orElse(new TrainingJobTitle());
		entity.setTrainingJobTitlePK(pk);
		entity.setPositionCd(jobTitleTraining.getPositionCodeTraining().v());
		entity.setAsManager(jobTitleTraining.isTreatAsAManager() ? 1 : 0);
		entity.setIsAbrogated(jobTitleTraining.isAbrogated() ? 1 : 0);
		return entity;
	}
}
