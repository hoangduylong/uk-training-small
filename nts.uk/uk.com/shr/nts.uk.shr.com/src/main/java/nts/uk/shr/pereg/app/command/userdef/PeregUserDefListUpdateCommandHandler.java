package nts.uk.shr.pereg.app.command.userdef;

import java.util.List;

public interface PeregUserDefListUpdateCommandHandler {
	void handle(List<PeregUserDefUpdateCommand> command);
}
