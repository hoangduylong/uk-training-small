package nts.uk.ctx.bs.employee.infra.entity.jobtitle.approver;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class BsympApproverListJob {
	
	@Column(name = "CID")
    private String companyID;
    
    @Column(name = "APPROVER_G_CD")
    private String approverGroupCD;
    
    @Column(name = "JOB_ID")
    private String jobID;
    
}
