package nts.uk.ctx.bs.employee.pub.generalinfo.classification;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ExClassificationHistoryDto {
	
	private String employeeId;
	
	private List<ExClassificationHistItemDto> classificationItems;

}
