package nts.uk.ctx.basic.app.command.training.position;

import lombok.*;

@NoArgsConstructor
@Data
public class UpdatePositionCommand {
	private String positionCode;
	private String positionName;
	private int positionOrder;
}
