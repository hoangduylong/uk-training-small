package nts.uk.ctx.basic.dom.training.position;

import lombok.*;
import nts.arc.layer.dom.objecttype.DomainAggregate;

public class PositionTraining implements DomainAggregate {

	// Position Code
	@Getter
	private PositionCodeTraining positionCode;
	
	// Position Name
	@Getter
	@Setter
	private PositionNameTraining positionName;
	
	// Position Order
	@Getter
	@Setter
	private int positionOrder;

	
	// Constructor
	public PositionTraining(PositionCodeTraining positionCode, PositionNameTraining positionName, int positionOrder) {
		super();
		this.positionCode = positionCode;
		this.positionName = positionName;
		this.positionOrder = positionOrder;
	}


	// Convert java type to domain
	public static PositionTraining toDomain(String positionCode, String positionName, int positionOrder) {
		return new PositionTraining(
			new PositionCodeTraining(positionCode),
			new PositionNameTraining(positionName),
			positionOrder);
	}

}

