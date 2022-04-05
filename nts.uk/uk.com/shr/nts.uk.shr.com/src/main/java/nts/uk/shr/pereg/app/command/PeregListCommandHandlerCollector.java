package nts.uk.shr.pereg.app.command;

import java.util.Set;

public interface PeregListCommandHandlerCollector {

	Set<PeregAddListCommandHandler<?>> collectAddHandlers();

	Set<PeregUpdateListCommandHandler<?>> collectUpdateHandlers();
}
