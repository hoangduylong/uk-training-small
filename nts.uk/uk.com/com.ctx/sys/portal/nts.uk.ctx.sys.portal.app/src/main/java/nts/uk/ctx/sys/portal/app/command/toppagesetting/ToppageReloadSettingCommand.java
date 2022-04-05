package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import lombok.Data;

@Data
public class ToppageReloadSettingCommand {
	public Integer reloadInteval;
	public String cId;
}
