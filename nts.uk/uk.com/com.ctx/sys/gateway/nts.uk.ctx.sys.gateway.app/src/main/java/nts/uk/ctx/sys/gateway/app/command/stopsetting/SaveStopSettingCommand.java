package nts.uk.ctx.sys.gateway.app.command.stopsetting;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SaveStopSettingCommand {

	private int isSystem;

	private StopCommand stopCommand;
}
