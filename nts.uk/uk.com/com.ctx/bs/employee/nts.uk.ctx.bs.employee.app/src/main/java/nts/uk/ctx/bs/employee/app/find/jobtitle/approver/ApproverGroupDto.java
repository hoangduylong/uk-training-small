package nts.uk.ctx.bs.employee.app.find.jobtitle.approver;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroup;

@AllArgsConstructor
@Getter
public class ApproverGroupDto {
	
	private String approverGroupCD;
	
	private String approverGroupName;
	
	private List<ApproverJobDto> approverJobList;
	
	public static ApproverGroupDto fromDomain(ApproverGroup approverGroup) {
		return new ApproverGroupDto(
				approverGroup.getApproverGroupCD().v(), 
				approverGroup.getApproverGroupName().v(), 
				approverGroup.getApproverJobList().stream().map(x -> ApproverJobDto.fromDomain(x)).collect(Collectors.toList()));
	}
	
}
