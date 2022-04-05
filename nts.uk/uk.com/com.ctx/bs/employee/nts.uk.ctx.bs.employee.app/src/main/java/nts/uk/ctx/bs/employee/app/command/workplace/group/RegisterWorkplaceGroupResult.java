package nts.uk.ctx.bs.employee.app.command.workplace.group;

import java.util.List;

import lombok.Data;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceInforParam;

@Data
public class RegisterWorkplaceGroupResult {
	
	private String wkpGrId;
	
	private List<String> lstWKPID;
	
	private List<WorkplaceInforParam> listWorkplaceInfo;
	
	private List<WorkplaceReplaceResult> resultProcess;

	public RegisterWorkplaceGroupResult(List<String> lstWKPID, List<WorkplaceInforParam> listWorkplaceInfo,
			List<WorkplaceReplaceResult> resultProcess, String wkpGrId) {
		super();
		this.lstWKPID = lstWKPID;
		this.listWorkplaceInfo = listWorkplaceInfo;
		this.resultProcess = resultProcess;
		this.wkpGrId = wkpGrId;
	}
}
