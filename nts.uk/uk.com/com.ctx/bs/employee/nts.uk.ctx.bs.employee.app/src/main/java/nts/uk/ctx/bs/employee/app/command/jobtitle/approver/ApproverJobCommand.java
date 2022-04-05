package nts.uk.ctx.bs.employee.app.command.jobtitle.approver;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverJob;

@AllArgsConstructor
@Getter
public class ApproverJobCommand {
	
	private String jobID;
	
	private int order;
	
	public ApproverJob toDomain() {
		return new ApproverJob(jobID, order);
	}
}
