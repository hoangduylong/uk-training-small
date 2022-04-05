package nts.uk.ctx.sys.portal.app.command.standardmenu;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StandardMenuCommand {
	private int classification;
	private String code;
	private String displayName;
	private int system;
}
