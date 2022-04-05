package nts.uk.ctx.bs.employee.infra.entity.jobtitle.approver;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroup;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@Table(name = "BSYMT_APPROVER_GROUP")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BsymtApproverGroup extends ContractUkJpaEntity {
	
	@EmbeddedId
	private BsympApproverGroup pk;
	
	@Column(name = "APPROVER_G_NAME")
    private String approverGroupName;
	
	@OneToMany(targetEntity = BsymtApproverListJob.class, mappedBy = "approverGroup", cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "BSYMT_APPROVER_G_LIST_JOB")
	public List<BsymtApproverListJob> approverJobList;

	@Override
	protected Object getKey() {
		return pk;
	}
	
	public static BsymtApproverGroup fromDomain(ApproverGroup approverGroup) {
		return new BsymtApproverGroup(
				new BsympApproverGroup(
						approverGroup.getCompanyID(), 
						approverGroup.getApproverGroupCD().v()), 
				approverGroup.getApproverGroupName().v(),
				approverGroup.getApproverJobList().stream()
					.map(x -> BsymtApproverListJob.fromDomain(
							approverGroup.getCompanyID(), 
							approverGroup.getApproverGroupCD().v(), 
							x))
					.collect(Collectors.toList()));
	}
	
}
