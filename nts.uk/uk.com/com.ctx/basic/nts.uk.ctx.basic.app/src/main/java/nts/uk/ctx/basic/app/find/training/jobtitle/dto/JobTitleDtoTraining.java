package nts.uk.ctx.basic.app.find.training.jobtitle.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobTitleDtoTraining {
	private String positionCodeTraining;
	private String positionName;
	private String jobTitleCode;
	private List<HistoryDtoTraining> historyTrainings;
	private boolean isAbrogated;
	private boolean treatAsAManager;	
}
