package nts.uk.ctx.bs.employee.ws.jobtitle;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGInfo;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroupRepository;
import nts.uk.shr.com.context.AppContexts;

@Path("bs/employee/jobtitle/group/approver")
@Produces(MediaType.APPLICATION_JSON)
public class JobGroupInfoService extends WebService {
	
	@Inject
	private ApproverGroupRepository repoApproverGroup;
	
	@POST
	@Path("getAll")
	public List<ApproverGInfo> finAllJobG() {
		return repoApproverGroup.getAll(AppContexts.user().companyId());
	}
	
	@POST
	@Path("findByCd")
	public List<ApproverGInfo> finJobGByCd(List<String> lstJobG) {
		return repoApproverGroup.findByCd(AppContexts.user().companyId(), lstJobG);
	}
}


