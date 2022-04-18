package nts.uk.ctx.basic.app.find.training.position.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class PositionDto {
	
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
