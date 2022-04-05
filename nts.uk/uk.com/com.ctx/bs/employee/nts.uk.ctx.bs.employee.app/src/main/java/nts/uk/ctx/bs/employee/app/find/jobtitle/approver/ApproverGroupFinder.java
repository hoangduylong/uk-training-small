package nts.uk.ctx.bs.employee.app.find.jobtitle.approver;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroupRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ApproverGroupFinder {
	
	@Inject
	private ApproverGroupRepository approverGroupRepository;
	
	public List<ApproverGroupDto> findAll() {
		String companyID = AppContexts.user().companyId();
		return approverGroupRepository.findAll(companyID).stream().map(x -> ApproverGroupDto.fromDomain(x)).collect(Collectors.toList());
	}
	
}
