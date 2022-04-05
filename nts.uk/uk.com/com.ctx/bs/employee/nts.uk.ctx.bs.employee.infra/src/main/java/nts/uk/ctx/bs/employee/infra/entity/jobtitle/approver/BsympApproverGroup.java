package nts.uk.ctx.bs.employee.infra.entity.jobtitle.approver;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BsympApproverGroup {
	
	@Column(name = "CID")
    private String companyID;
    
    @Column(name = "APPROVER_G_CD")
    private String approverGroupCD;
	
}
