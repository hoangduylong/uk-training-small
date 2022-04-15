package nts.uk.ctx.basic.infra.repository.training.jobtitle;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.dom.training.position.PositionCodeTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleCodeTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingHistory;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingHistoryPK;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingJobTitle;
import nts.uk.ctx.basic.infra.entity.training.jobtitle.TrainingJobTitlePK;

@Stateless
public class JpaJobTitleRepositoryTraining extends JpaRepository implements JobTitleRepositoryTraining {
	
	@Inject
	private static final String SELECT_ALL = "SELECT a FROM TrainingJobTitle a";


	@Override
	public List<JobTitleTraining> findAll() {
		List<JobTitleTraining> kq =  this.queryProxy().query(SELECT_ALL, TrainingJobTitle.class)
				.getList(x -> TrainingJobTitle.toDomain(x));
		return kq;
	}

	@Override
	public List<JobTitleTraining> findAllByJdbc() {
		
		String sql = "SELECT p.POSITION_CD, j.JOB_CD, h.JOB_NAME,"
				+ " h.START_DATE, h.END_DATE, j.IS_ABROGATED, j.AS_MANAGER"
				+ " FROM TRAINING_JOB_TITLE j"
				+ " INNER JOIN TRAINING_POSITION p ON j.POSITION_CD = p.POSITION_CD"
				+ " INNER JOIN TRAINING_HISTORY h ON j.JOB_CD = h.JOB_CD";
		try (PreparedStatement statement = this.connection().prepareStatement(sql)){
			
			return new NtsResultSet(statement.executeQuery()).getList(rs -> {
				String possitionCode = rs.getString("POSITION_CD");
				String jobCode = rs.getString("JOB_CD");
				String jobName = rs.getString("JOB_NAME");
				String startDate = rs.getString("START_DATE");
				String endDate = rs.getString("END_DATE");
				int isAbrogated = rs.getInt("IS_ABROGATED");
				int asManager = rs.getInt("AS_MANAGER");
				
				JobTitleTraining jobTitleTraining = new JobTitleTraining(
						new PositionCodeTraining(possitionCode), 
						new JobTitleCodeTraining(jobCode), 
						new ArrayList<>(), // đoạn này a đang ko hiểu em lấy list này ở đâu vì trong query trả ra đang ko có 
						isAbrogated == 1 ? true : false, asManager == 1 ? true : false);
				
				return jobTitleTraining;
			});
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public Optional<JobTitleTraining> find(String jobTitleCode) {
		return this.queryProxy().find(new TrainingJobTitlePK(jobTitleCode), TrainingJobTitle.class).map(x -> TrainingJobTitle.toDomain(x));
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
