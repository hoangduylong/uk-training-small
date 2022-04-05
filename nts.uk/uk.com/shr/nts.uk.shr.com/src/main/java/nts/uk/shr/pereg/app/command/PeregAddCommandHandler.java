package nts.uk.shr.pereg.app.command;

import lombok.val;

public interface PeregAddCommandHandler<C> extends PeregCommandHandler<C> {

	PeregAddCommandResult handle(C command);
	
	@SuppressWarnings("unchecked")
	default PeregAddCommandResult handlePeregCommand(Object peregCommand) {
		return this.handle((C)peregCommand);
	}

	default PeregAddCommandResult handlePeregCommand(String personId, String employeeId, ItemsByCategory itemsByCategory) {
		val commandForSystemDomain = itemsByCategory.createCommandForSystemDomain(
				personId, employeeId, this.commandClass());
		
		return this.handlePeregCommand(commandForSystemDomain);
	}
}
