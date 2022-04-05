package nts.uk.shr.com.task.schedule;

import java.util.Optional;

import nts.arc.time.GeneralDateTime;

public interface UkJobScheduler {

	ScheduleInfo scheduleOnCurrentCompany(UkJobScheduleOptions options);
	
	void unscheduleOnCurrentCompany(String scheduleId);
	
	Optional<GeneralDateTime> getNextFireTime(String scheduleId);
}
