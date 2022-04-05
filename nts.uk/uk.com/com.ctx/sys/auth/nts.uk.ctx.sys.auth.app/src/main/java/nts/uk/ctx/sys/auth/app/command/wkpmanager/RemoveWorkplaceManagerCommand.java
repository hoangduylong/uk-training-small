package nts.uk.ctx.sys.auth.app.command.wkpmanager;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RemoveWorkplaceManagerCommand {
	/* 職場管理者ID */
	private String wkpManagerId;
}
