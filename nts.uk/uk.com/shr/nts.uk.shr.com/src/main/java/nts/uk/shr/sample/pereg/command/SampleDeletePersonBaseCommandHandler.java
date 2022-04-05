package nts.uk.shr.sample.pereg.command;

import javax.ejb.Stateless;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class SampleDeletePersonBaseCommandHandler extends CommandHandler<SampleDeletePersonBaseCommand>
		implements PeregDeleteCommandHandler<SampleDeletePersonBaseCommand> {

	@Override
	protected void handle(CommandHandlerContext<SampleDeletePersonBaseCommand> context) {
		
		SampleDeletePersonBaseCommand command = context.getCommand();
		command.getEmployeeId();
		/* delete process */
	}

	@Override
	public String targetCategoryCd() {
		return "CS00001";
	}

	@Override
	public Class<?> commandClass() {
		return SampleDeletePersonBaseCommand.class;
	}

}
