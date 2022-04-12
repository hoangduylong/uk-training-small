package nts.uk.ctx.basic.app.command.training.position;

import lombok.*;
import nts.uk.ctx.basic.dom.training.position.PositionCodeTraining;
import nts.uk.ctx.basic.dom.training.position.PositionNameTraining;
import nts.uk.ctx.basic.dom.training.position.PositionTraining;

@NoArgsConstructor
@Data
public class UpdatePositionCommand {
	
	private String positionCode;
	private String positionName;
	private int positionOrder;
	
	public PositionTraining toDomain(UpdatePositionCommand command) {
		return new PositionTraining(
				new PositionCodeTraining(command.positionCode),
				new PositionNameTraining(command.positionName),
				command.positionOrder);
	}
}


