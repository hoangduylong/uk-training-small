package nts.uk.ctx.basic.app.command.training.jobtitle;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.uk.ctx.basic.dom.training.jobtitle.HistoryTraining;

@Data
@AllArgsConstructor
public class HistoryCommand {

	private String historyId;
	private String jobTitleCode;
	private String jobTitleName;
	private String startDate;
	private String endDate;

	public static HistoryTraining toDomain(HistoryCommand command) {
		return new HistoryTraining(command.historyId,
				command.jobTitleCode,
				command.jobTitleName,
				command.startDate,
				command.endDate);

	}
}
