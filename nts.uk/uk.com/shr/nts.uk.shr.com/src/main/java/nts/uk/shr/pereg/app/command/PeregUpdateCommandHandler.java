package nts.uk.shr.pereg.app.command;

import lombok.val;

public interface PeregUpdateCommandHandler<C> extends PeregCommandHandler<C> {
	
	void handle(C command);
	
	@SuppressWarnings("unchecked")
	default void handlePeregCommand(Object peregCommand) {
		this.handle((C)peregCommand);
	}

	default void handlePeregCommand(String personId, String employeeId, ItemsByCategory itemsByCategory) {
		val commandForSystemDomain = itemsByCategory.createCommandForSystemDomain(
				personId, employeeId, this.commandClass());
		
		this.handlePeregCommand(commandForSystemDomain);
	}
}
