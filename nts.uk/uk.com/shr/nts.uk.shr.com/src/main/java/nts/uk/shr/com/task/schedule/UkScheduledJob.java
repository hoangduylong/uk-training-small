package nts.uk.shr.com.task.schedule;

import lombok.val;
import nts.arc.task.schedule.job.ScheduledJob;
import nts.arc.task.schedule.job.ScheduledJobExecutionContext;

/**
 * Base class of scheduled jobs for UK
 */
public abstract class UkScheduledJob extends ScheduledJob {

	@Override
	protected void execute(ScheduledJobExecutionContext context) {
		
		val executionContext = new ExecutionContext(context);
		
		// TODO: change login user context and PGID as batch
		
		this.execute(executionContext);
	}
	
	protected abstract void execute(ExecutionContext context);

}
