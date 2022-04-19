package nts.uk.ctx.basic.app.command.training.jobtitle;


import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.uk.ctx.basic.dom.training.jobtitle.HistoryTraining;
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
	public JobTitleTraining toDomain() {
		return new JobTitleTraining(
				new PositionCodeTraining(this.positionCodeTraining),
				new JobTitleCodeTraining(this.jobTitleCode),
				this.toListDomain(this.historyTrainings),
				isAbrogated,
				treatAsAManager);
	}
	
	public List<HistoryTraining> toListDomain(List<HistoryCommand> listHistories) {
		List<HistoryTraining> result = new ArrayList<HistoryTraining>();
		for (HistoryCommand history : listHistories) {
			result.add(new HistoryTraining(history.getHistoryId(),
					history.getJobTitleCode(),
					history.getJobTitleName(),
					history.getStartDate(),
					history.getEndDate()));
		}
		return result;
	}
		
}
