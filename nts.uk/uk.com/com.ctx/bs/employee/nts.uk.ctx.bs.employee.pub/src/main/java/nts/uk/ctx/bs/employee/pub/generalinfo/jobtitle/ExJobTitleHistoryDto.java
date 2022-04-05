package nts.uk.ctx.bs.employee.pub.generalinfo.jobtitle;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ExJobTitleHistoryDto {
	
	private String employeeId;
	
	private List<ExJobTitleHistItemDto> jobTitleItems;

}
