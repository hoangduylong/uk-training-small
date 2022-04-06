package nts.uk.ctx.basic.infra.entity.training.position;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class PositionClassificationPK implements Serializable{
		
	static final long serialVersionUID = 1L;

	@Column(name="POSITION_CD")
	public String positionCode;
}
