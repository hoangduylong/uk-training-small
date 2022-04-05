package nts.uk.ctx.sys.auth.app.command.role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteRoleCommand {
	/** The role id. */
	// Id
	private String roleId;

}
