package nts.uk.ctx.sys.auth.app.command.person.role;

import lombok.Data;

@Data
public class RemovePersonRoleCommand {
	private String roleId;
	private Integer assignAtr;
}
