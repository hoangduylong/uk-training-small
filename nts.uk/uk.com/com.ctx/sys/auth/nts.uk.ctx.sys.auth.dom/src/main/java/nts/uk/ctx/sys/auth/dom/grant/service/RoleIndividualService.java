package nts.uk.ctx.sys.auth.dom.grant.service;


import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

public interface RoleIndividualService {
	
	boolean checkSysAdmin(String userID, DatePeriod validPeriod);

	String getRoleFromUserId(String userId, int roleType, GeneralDate baseDate);
}
