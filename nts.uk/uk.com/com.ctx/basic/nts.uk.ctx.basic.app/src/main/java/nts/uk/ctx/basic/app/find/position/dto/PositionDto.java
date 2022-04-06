package nts.uk.ctx.basic.app.training.position.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class PositionDto {
	private String positionCode;
	private String positionName;
	private int positionOrder;
}
