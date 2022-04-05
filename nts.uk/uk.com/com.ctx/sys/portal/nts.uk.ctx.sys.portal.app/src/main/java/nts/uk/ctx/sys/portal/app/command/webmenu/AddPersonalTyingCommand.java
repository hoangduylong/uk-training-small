package nts.uk.ctx.sys.portal.app.command.webmenu;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AddPersonalTyingCommand {
	
	private List<PersonTypingCommand> persons;
}
