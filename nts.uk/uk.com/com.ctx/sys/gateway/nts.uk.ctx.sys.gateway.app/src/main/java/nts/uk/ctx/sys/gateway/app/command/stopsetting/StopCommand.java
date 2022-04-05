package nts.uk.ctx.sys.gateway.app.command.stopsetting;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StopCommand {

	/** システム利用状態 */
	private Integer systemStatus;

	/** 停止予告のメッセージ */
	private String stopMessage;

	/** 利用停止モード */
	private Integer stopMode;

	/** 利用停止のメッセージ */
	private String usageStopMessage;

}
