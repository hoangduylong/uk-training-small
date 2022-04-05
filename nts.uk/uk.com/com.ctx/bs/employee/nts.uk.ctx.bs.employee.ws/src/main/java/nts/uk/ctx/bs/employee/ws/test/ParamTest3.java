package nts.uk.ctx.bs.employee.ws.test;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ParamTest3 {

	List<String> listSId;
	GeneralDate baseDate;

}
