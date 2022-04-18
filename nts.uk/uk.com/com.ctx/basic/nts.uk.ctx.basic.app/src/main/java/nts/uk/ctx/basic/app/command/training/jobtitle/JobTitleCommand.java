package nts.uk.ctx.basic.app.command.training.jobtitle;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class JobTitleCommand {

	private String positionCodeTraining;
	private String jobTitleCode;
	private List<HistoryCommand> historyTrainings;
	private boolean isAbrogated;
	private boolean treatAsAManager;
	private boolean isAdd;
}
