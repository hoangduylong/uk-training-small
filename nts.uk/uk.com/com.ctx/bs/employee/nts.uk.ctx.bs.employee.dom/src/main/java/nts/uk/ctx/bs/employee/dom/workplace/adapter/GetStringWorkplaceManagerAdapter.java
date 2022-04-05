package nts.uk.ctx.bs.employee.dom.workplace.adapter;

import java.util.List;

import nts.arc.time.GeneralDate;

public interface GetStringWorkplaceManagerAdapter {
	
	List<String> getAllWorkplaceID (String empID , GeneralDate baseDate);

}
