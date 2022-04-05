package nts.uk.shr.pereg.app.command;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.val;

public interface PeregAddListCommandHandler<C> extends PeregCommandHandler<C> {
	
	List<MyCustomizeException> handle(List<C> command);
	
	@SuppressWarnings("unchecked")
	default List<MyCustomizeException> handlePeregLstCommand(List<Object> peregCommand) {
		List<C> commandLst = peregCommand.stream().map(c ->  (C)c).collect(Collectors.toList());
		return this.handle(commandLst);
	}

	default List<MyCustomizeException> handlePeregCommand(List<PeregInputContainerCps003> input) {
		val commandLst = new ArrayList<>();
		input.stream().forEach(c ->{
			ItemsByCategory itemsByCategory = c.getInputs();
			commandLst.add(itemsByCategory.createCommandForSystemDomain(
					c.getPersonId(), c.getEmployeeId(), this.commandClass()));
		});
		return this.handlePeregLstCommand(commandLst);
	}
}
