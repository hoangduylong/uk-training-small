package nts.uk.ctx.basic.app.training.jobtitle.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.GeneralDate;

@Data
@AllArgsConstructor
public class HistoryDtoTraining {
	private String JobTitleId;
	private String JobTitleCode;
	private String JobTitleName;
	private GeneralDate StartDate; 
	private GeneralDate EndDate; 
}

