package nts.uk.ctx.basic.infra.entity.training.jobtitle;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Getter
@Setter
@Entity
@Table(name = "TRAINING_POSITION")
public class TrainingPosition extends ContractUkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The Training History PK. */
	@EmbeddedId
	protected TrainingPositionPK trainingPositionPK;

	/** The Position Name. */
	@Column(name = "POSITION_NAME")
	private String positionName;

	/** The Training JobTitle. */
	@OneToMany(targetEntity = TrainingJobTitle.class, mappedBy = "trainingPosition", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	@JoinTable(name = "TRAINING_JOB_TITLE")
	public List<TrainingJobTitle> lstTrainingJobTitle;


	public TrainingPosition() {
		super();
	}

	
	/**
	 * Instantiates a new Training History.
	 *
	 * @param trainingHistoryPK the Training History PK
	 */
	public TrainingPosition(TrainingPositionPK trainingPositionPK) {
		this.trainingPositionPK = trainingPositionPK;
	}
	

	/**
	 * Get the Training History PK
	 */
	@Override
	protected Object getKey() {
		return this.trainingPositionPK;
	}

}