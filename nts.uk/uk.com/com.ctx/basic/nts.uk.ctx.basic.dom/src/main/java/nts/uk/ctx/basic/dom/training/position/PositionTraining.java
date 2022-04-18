package nts.uk.ctx.basic.dom.training.position;

import lombok.*;
import nts.arc.layer.dom.objecttype.DomainAggregate;

// 序列の登録

public class PositionTraining implements DomainAggregate {

	// 序列コード
	// position's code
	@Getter
	private PositionCodeTraining positionCode;
	
	// 序列名
	// position's name
	@Getter
	@Setter
	private PositionNameTraining positionName;
	
	// 序列順序
	// position's order
	@Getter
	@Setter
	private int positionOrder;

	
	public PositionTraining(PositionCodeTraining positionCode, PositionNameTraining positionName, int positionOrder) {
		super();
		this.positionCode = positionCode;
		this.positionName = positionName;
		this.positionOrder = positionOrder;
	}


	// convert java type to domain
	public static PositionTraining toDomain(String positionCode, String positionName, int positionOrder) {
		return new PositionTraining(
			new PositionCodeTraining(positionCode),
			new PositionNameTraining(positionName),
			positionOrder);
	}

}

