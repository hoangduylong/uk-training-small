package nts.uk.ctx.bs.employee.pub.generalinfo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.uk.ctx.bs.employee.pub.generalinfo.classification.ExClassificationHistoryDto;
import nts.uk.ctx.bs.employee.pub.generalinfo.employment.ExEmploymentHistoryDto;
import nts.uk.ctx.bs.employee.pub.generalinfo.jobtitle.ExJobTitleHistoryDto;
import nts.uk.ctx.bs.employee.pub.generalinfo.workplace.ExWorkPlaceHistoryDto;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class EmployeeGeneralInfoDto {

	private List<ExEmploymentHistoryDto> employmentDto;
	
	private List<ExClassificationHistoryDto> classificationDto;
	
	private List<ExJobTitleHistoryDto> jobTitleDto;
	
	private List<ExWorkPlaceHistoryDto> workplaceDto;
	
}
