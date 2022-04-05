package nts.uk.ctx.bs.company.pub.company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//import nts.arc.time.GeneralDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BeginOfMonthExport {

	private String cid;

	private int startMonth;
}
