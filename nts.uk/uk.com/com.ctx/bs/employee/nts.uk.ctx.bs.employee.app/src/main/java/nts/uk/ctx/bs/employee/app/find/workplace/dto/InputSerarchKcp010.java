package nts.uk.ctx.bs.employee.app.find.workplace.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@Getter
@Setter
@NoArgsConstructor
public class InputSerarchKcp010 {
	
	private GeneralDate baseDate;
	
	private String workplaceCode ;

	public InputSerarchKcp010(GeneralDate baseDate, String workplaceCode) {
		super();
		this.baseDate = baseDate;
		this.workplaceCode = workplaceCode;
	}
	
	
}
