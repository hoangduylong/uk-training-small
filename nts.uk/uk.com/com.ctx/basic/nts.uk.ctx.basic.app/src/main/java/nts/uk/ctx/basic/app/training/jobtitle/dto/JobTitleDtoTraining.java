package nts.uk.ctx.basic.app.training.jobtitle.dto;

import java.util.List;

import lombok.Data;
import lombok.AllArgsConstructor;


@Data
@AllArgsConstructor
public class JobTitleDtoTraining {
	private String positionCodeTraining;
	private String jobTitleCode;
	private List<HistoryDtoTraining> historyTrainings;
	private boolean isAbrogated;
	private boolean treatAsAManager;	
}
