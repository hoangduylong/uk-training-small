package nts.uk.ctx.bs.employee.app.find.jobtitle.approver;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverJob;

@AllArgsConstructor
@Getter
public class ApproverJobDto {
	
	private String jobID;
	
	private int order;
	
	public static ApproverJobDto fromDomain(ApproverJob approverJob) {
		return new ApproverJobDto(approverJob.getJobID(), approverJob.getOrder());
	}
	
}
