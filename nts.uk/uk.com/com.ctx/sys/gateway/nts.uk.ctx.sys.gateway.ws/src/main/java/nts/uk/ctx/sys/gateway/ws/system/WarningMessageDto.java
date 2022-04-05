package nts.uk.ctx.sys.gateway.ws.system;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WarningMessageDto {
	private boolean display;
	private String message;
}
