package nts.uk.ctx.basic.app.command.training.jobtitle;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class JobTitleCommand {

	private String positionCode;
	private String jobTitleCode;
	private List<String> historyId;
	private List<String> jobTitleName;
	private List<String> startDate;
	private List<String> endDate;
	private boolean isAbrogated;
	private boolean treatAsAManager;
	
}
