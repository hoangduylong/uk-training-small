package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import java.util.List;
import java.util.Map;

import org.junit.Test;

import mockit.Expectations;
import mockit.Injectable;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
import nts.uk.ctx.bs.employee.dom.workplace.group.domainservice.ReplaceWorkplacesService.Require;

public class ReplaceWorkplacesServiceTest {
	@Injectable
	private Require require;
	
	@Test
	public void testRep() {
		WorkplaceGroup group = DomainServiceHelper.Helper.DUMMY;
		List<String> lstWorkplaceId = DomainServiceHelper.getLstId();
		List<AffWorkplaceGroup> lstFormerAffInfo = DomainServiceHelper.getHelper();
		new Expectations() {
			{
				require.getByListWKPID(lstWorkplaceId);// dummy
				result = lstFormerAffInfo;
			}
		};
		Map<String, WorkplaceReplaceResult> workplacesService = ReplaceWorkplacesService.getWorkplace(require, group, lstWorkplaceId);
		AtomTask persist = workplacesService.get(0).getPersistenceProcess().get();
		persist.run();
	} 
}
