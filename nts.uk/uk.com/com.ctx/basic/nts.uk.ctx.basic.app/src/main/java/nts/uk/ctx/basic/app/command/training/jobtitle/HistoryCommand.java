package nts.uk.ctx.basic.app.command.training.jobtitle;

import java.util.ArrayList;
import java.util.List;

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
		return new HistoryTraining(command.historyId, command.jobTitleCode, command.jobTitleName, command.startDate,
				command.endDate);

	}

	public static List<HistoryTraining> toListDomain(List<HistoryCommand> listHistories) {
		List<HistoryTraining> result = new ArrayList<HistoryTraining>();
		for (HistoryCommand history : listHistories) {
			result.add(new HistoryTraining(history.historyId, history.getJobTitleCode(),
					history.getJobTitleName(), history.startDate, history.endDate));
		}
		return result;
	}
}
