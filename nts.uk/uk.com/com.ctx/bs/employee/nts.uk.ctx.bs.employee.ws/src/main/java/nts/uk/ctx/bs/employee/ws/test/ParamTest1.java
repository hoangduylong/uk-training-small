package nts.uk.ctx.bs.employee.ws.test;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ParamTest1 {
	
	String employmentCode1;
	GeneralDate birthDayStart1;
	GeneralDate endDayStart1;
	
	String employmentCode2;
	GeneralDate birthDayStart2;
	GeneralDate endDayStart2;
	
	String employmentCode3;
	GeneralDate birthDayStart3;
	GeneralDate endDayStart3;

	GeneralDate baseDate;
	String cid;
	
}
