package nts.uk.ctx.sys.auth.app.command.wkpmanager;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.app.find.wkpmanager.dto.WorkplaceAuthorityDto;

@Data
@NoArgsConstructor
public class SaveWorkplaceManagerCommand {
	/* 職場管理者ID */
	private String wkpManagerId;
	
	/* 社員ID */
	private String employeeId;
	
	/* 職場ID */
	private String wkpId;
	
	/* 開始日 */
	private GeneralDate startDate;
	
	/* 終了日 */
	private GeneralDate endDate;
	
	private List<WorkplaceAuthorityDto> roleList;
	
	private boolean newMode; 
}
