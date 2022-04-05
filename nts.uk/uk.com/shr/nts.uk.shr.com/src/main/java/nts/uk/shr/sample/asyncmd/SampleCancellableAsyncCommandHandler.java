package nts.uk.shr.sample.asyncmd;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.app.command.AsyncCommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;

@Stateless
public class SampleCancellableAsyncCommandHandler extends AsyncCommandHandler<SampleCancellableAsyncCommand> {

	@Override
	protected void handle(CommandHandlerContext<SampleCancellableAsyncCommand> context) {
		
		val asyncContext = context.asAsync();
		
		for (int i = 0; i < 10; i++) {
			
//			String s = null;
//			s.toString();
			
			// user requested to cancel task
			if (asyncContext.hasBeenRequestedToCancel()) {
				
				/* do something to clean up */
				
				// cancel explicitly
				asyncContext.finishedAsCancelled();
				break;
			}
			
			// some heavy task
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
