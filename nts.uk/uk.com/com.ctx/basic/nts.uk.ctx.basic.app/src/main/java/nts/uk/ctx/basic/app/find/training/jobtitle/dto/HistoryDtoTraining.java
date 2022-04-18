package nts.uk.ctx.basic.app.find.training.jobtitle.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.GeneralDate;

@Data
@AllArgsConstructor
public class HistoryDtoTraining {
	private String historyId;
	private String jobTitleCode;
	private String jobTitleName;
	private GeneralDate startDate; 
	private GeneralDate endDate; 
}

