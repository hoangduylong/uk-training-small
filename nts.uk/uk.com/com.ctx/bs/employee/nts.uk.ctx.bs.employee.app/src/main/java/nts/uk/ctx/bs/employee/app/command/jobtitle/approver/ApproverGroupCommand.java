package nts.uk.ctx.bs.employee.app.command.jobtitle.approver;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroup;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverName;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode;
import nts.uk.shr.com.context.AppContexts;

@AllArgsConstructor
@Getter
public class ApproverGroupCommand {
	
	private String approverGroupCD;
	
	private String approverGroupName;
	
	private List<ApproverJobCommand> approverJobList;
	
	public ApproverGroup toDomain() {
		String companyID = AppContexts.user().companyId();
		return new ApproverGroup(
				companyID, 
				new JobTitleCode(approverGroupCD), 
				new ApproverName(approverGroupName), 
				approverJobList.stream().map(x -> x.toDomain()).collect(Collectors.toList()));
	}
	
}
