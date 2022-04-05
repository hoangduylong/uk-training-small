package nts.uk.shr.sample.pereg.command;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class SampleAddPersonBaseCommandHandler extends CommandHandlerWithResult<SampleUpdatePersonBaseCommand, PeregAddCommandResult>
		implements PeregAddCommandHandler<SampleUpdatePersonBaseCommand> {

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<SampleUpdatePersonBaseCommand> context) {
		
		val command = context.getCommand();
		String fullName = command.getFullName();
		fullName.toString();
		
		String newRecordId = "aaa";
		return new PeregAddCommandResult(newRecordId);
	}

	@Override
	public String targetCategoryCd() {
		return "CS00001";
	}

	@Override
	public Class<?> commandClass() {
		return SampleUpdatePersonBaseCommand.class;
	}

}
