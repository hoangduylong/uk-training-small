package nts.uk.ctx.basic.app.command.training.position;

import lombok.*;

@NoArgsConstructor
@Data
public class AddPositionCommand {

	// 序列コード
	// position's code
	private String positionCode;

	// 序列名
	// position's name
	private String positionName;

	// 序列順序
	// position's order
	private int positionOrder;
}
