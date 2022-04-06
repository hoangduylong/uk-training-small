package nts.uk.ctx.basic.infra.entity.training.jobtitle;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.PrimaryKeyJoinColumns;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.basic.dom.training.jobtitle.HistoryTraining;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


@Getter
@Setter
@Entity
@Table(name = "TRAINING_HISTORY")
public class TrainingHistory extends ContractUkJpaEntity implements Serializable {
	
    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;
    
    /** The Training History PK. */
    @EmbeddedId
    protected TrainingHistoryPK trainingHistoryPK;
    
    /** The job code. */
    @Column(name = "JOB_CD")
    private String jobCd;
    
    /** The job name. */
    @Column(name = "JOB_NAME")
    public String jobName;
    
    /** The start date. */
    @Column(name = "START_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
    private GeneralDate startDate;
    
    /** The end date. */
    @Column(name = "END_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
    private GeneralDate endDate;

    /** The training history*/
	@ManyToOne(fetch = FetchType.LAZY)
	@PrimaryKeyJoinColumns({ @PrimaryKeyJoinColumn(name = "JOB_CD", referencedColumnName = "JOB_CD")})
    public TrainingJobTitle trainingJobTitle;
    
    
	public TrainingHistory() {
		super();
	}	

	/**
	 * Get the Training History PK
	 */
	@Override
	protected Object getKey() {
		return this.trainingHistoryPK;
	}
	
	public static HistoryTraining toDomain(TrainingHistory trainingHistory)
	{
		HistoryTraining result = new HistoryTraining(trainingHistory.getKey().toString(), 
				trainingHistory.getJobCd(), 
				trainingHistory.getJobName(),
				trainingHistory.getStartDate().toString(),
				trainingHistory.getEndDate().toString());
		return result;
	}

	
}
