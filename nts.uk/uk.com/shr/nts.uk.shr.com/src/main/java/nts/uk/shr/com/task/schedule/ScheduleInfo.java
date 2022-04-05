package nts.uk.shr.com.task.schedule;

import lombok.Value;
import nts.gul.text.IdentifierUtil;

@Value
public class ScheduleInfo {

	private final String scheduleId;
	
	public static ScheduleInfo createNew() {
		return new ScheduleInfo(IdentifierUtil.randomUniqueId());
	}
}
