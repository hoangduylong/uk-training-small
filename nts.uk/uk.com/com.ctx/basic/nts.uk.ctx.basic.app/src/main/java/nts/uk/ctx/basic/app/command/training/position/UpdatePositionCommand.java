package nts.uk.ctx.basic.app.command.training.position;

import lombok.*;
import nts.uk.ctx.basic.dom.training.position.PositionCodeTraining;
import nts.uk.ctx.basic.dom.training.position.PositionNameTraining;
import nts.uk.ctx.basic.dom.training.position.PositionTraining;

@NoArgsConstructor
@Data
public class UpdatePositionCommand {

	// 序列コード
	// position's code
	private String positionCode;

	// 序列名
	// position's name
	private String positionName;

	// 序列順序
	// position's order
	private int positionOrder;

	// convert command into domain
	public PositionTraining toDomain(UpdatePositionCommand command) {
		return new PositionTraining(new PositionCodeTraining(command.positionCode),
									new PositionNameTraining(command.positionName), 
									command.positionOrder);
	}
}
