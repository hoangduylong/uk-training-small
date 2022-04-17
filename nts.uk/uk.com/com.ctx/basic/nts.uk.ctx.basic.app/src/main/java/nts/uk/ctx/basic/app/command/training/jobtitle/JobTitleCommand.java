package nts.uk.ctx.basic.app.command.training.jobtitle;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleCodeTraining;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleTraining;
import nts.uk.ctx.basic.dom.training.position.PositionCodeTraining;


@Data
@AllArgsConstructor
public class JobTitleCommand {

	private String positionCodeTraining;
	private String jobTitleCode;
	private List<HistoryCommand> historyTrainings;
	private boolean isAbrogated;
	private boolean treatAsAManager;
	private boolean isAdd;
	
	// To domain
	public static JobTitleTraining toDomain(JobTitleCommand command) {
		return new JobTitleTraining(new PositionCodeTraining(command.positionCodeTraining),
				new JobTitleCodeTraining(command.jobTitleCode),
				HistoryCommand.toListDomain(command.historyTrainings),
				command.isAbrogated,
				command.treatAsAManager);
	}
}
