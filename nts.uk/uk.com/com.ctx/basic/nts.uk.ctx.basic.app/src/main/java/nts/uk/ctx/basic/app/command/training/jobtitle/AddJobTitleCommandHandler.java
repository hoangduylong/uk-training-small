package nts.uk.ctx.basic.app.command.training.jobtitle;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.basic.dom.training.jobtitle.JobTitleRepositoryTraining;

@Stateless
public class AddJobTitleCommandHandler extends CommandHandler<JobTitleCommand> {

	@Inject
	private JobTitleRepositoryTraining jobTitleRepositoryTraining;

	@Inject
	private JobTitleCommandCheck check;

	@Override
	protected void handle(CommandHandlerContext<JobTitleCommand> context) {
		JobTitleCommand command = context.getCommand();
		
		check.check(command);

		if (command.isAdd())
			jobTitleRepositoryTraining.add(command.toDomain());
		else
			jobTitleRepositoryTraining.update(command.toDomain());
	}
}