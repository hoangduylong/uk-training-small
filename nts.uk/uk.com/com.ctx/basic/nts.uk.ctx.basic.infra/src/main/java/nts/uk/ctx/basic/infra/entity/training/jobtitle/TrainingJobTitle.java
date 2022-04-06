package nts.uk.ctx.basic.infra.entity.training.jobtitle;


import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.PrimaryKeyJoinColumns;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.basic.dom.training.jobtitle.HistoryTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleCodeTraining;
import nts.uk.ctx.basic.dom.training.position.PositionCodeTraining;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class Training JobTitle.
 */
@Getter
@Setter
@Entity
@Table(name = "TRAINING_JOB_TITLE")
public class TrainingJobTitle extends ContractUkJpaEntity implements Serializable {
	
    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;
    
    /** The Training Job Title PK. */
    @EmbeddedId
    protected TrainingJobTitlePK trainingJobTitlePK;
   
    /** The position Code. */
    @Column(name = "POSITION_CD")
    public String positionCd;
    
    /** The as manager. */
    @Column(name = "AS_MANAGER")
    public int asManager;
    
    /** The is abrogated. */
    @Column(name = "IS_ABROGATED")
    public int isAbrogated;

	/** The Training History. */
	@OneToMany(targetEntity = TrainingHistory.class, mappedBy = "trainingJobTitle", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	@JoinTable(name = "TRAINING_HISTORY")
	public List<TrainingHistory> lstTrainingHistory;
	
	/** The Training Position. */
	@ManyToOne(fetch = FetchType.LAZY)
	@PrimaryKeyJoinColumns({ @PrimaryKeyJoinColumn(name = "POSITION_CD", referencedColumnName = "POSITION_CD")})
    public TrainingPosition trainingPosition;
    
	
	public TrainingJobTitle(TrainingJobTitlePK trainingJobTitlePK, String positionCd, int asManager, int isAbrogated,
			List<TrainingHistory> lstTrainingHistory, TrainingPosition trainingPosition) {
		super();
		this.trainingJobTitlePK = trainingJobTitlePK;
		this.positionCd = positionCd;
		this.asManager = asManager;
		this.isAbrogated = isAbrogated;
		this.lstTrainingHistory = lstTrainingHistory;
		this.trainingPosition = trainingPosition;
	}
	
	public TrainingJobTitle() {
        super();
    }
	
	@Override
	protected Object getKey() {
		return this.trainingJobTitlePK;
	}

	
	public static JobTitleTraining toDomain(TrainingJobTitle trainingJobTitle)
	{
		List<HistoryTraining> historyTrainings = trainingJobTitle
				.getLstTrainingHistory().stream()
				.map(x -> TrainingHistory.toDomain(x))
				.collect(Collectors.toList());
		JobTitleTraining result = new JobTitleTraining(
				new PositionCodeTraining(trainingJobTitle.getPositionCd()),
				new JobTitleCodeTraining(String.valueOf(trainingJobTitle.getKey())),
				historyTrainings,
				Boolean.getBoolean(String.valueOf(trainingJobTitle.isAbrogated)),
				Boolean.getBoolean(String.valueOf(	trainingJobTitle.asManager)));
		return result;
	}
}
