package nts.uk.ctx.bs.employee.pub.generalinfo.workplace;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ExWorkPlaceHistoryDto {
	
	private String employeeId;
	
	private List<ExWorkplaceHistItemDto> workplaceItems;

}
