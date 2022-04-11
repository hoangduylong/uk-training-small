package nts.uk.ctx.basic.infra.entity.training.position;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TRAINING_POSITION")
public class PositionClassification extends UkJpaEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="POSITION_CD")
	public String positionCode;

	
	@NotNull
	@Basic(optional = false)
	@Column(name = "POSITION_NAME")
	public String positionName;
	

	@NotNull
	@Basic(optional = false)
	@Column(name = "POSITION_ORDER")
	public int positionOrder;


	protected Object getKey() {
		return positionCode;
	}
}
