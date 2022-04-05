package nts.uk.ctx.sys.portal.ac.toppagesetting;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.jobtitle.SyJobTitlePub;
import nts.uk.ctx.sys.portal.dom.toppagesetting.PortalJobTitleAdapter;
import nts.uk.ctx.sys.portal.dom.toppagesetting.PortalJobTitleImport;

/**
 * @author yennth
 */
@Stateless
public class PortalJobTitleAdapterImpl implements PortalJobTitleAdapter {
	@Inject
	private SyJobTitlePub sysPub;

	@Override
	public Optional<PortalJobTitleImport> getJobPosition(String employeeId) {
		GeneralDate date = GeneralDate.today();
		return this.sysPub.findBySid(employeeId, date).map(x -> {
			return PortalJobTitleImport.builder().employeeId(x.getEmployeeId()).jobTitleID(x.getJobTitleID())
					.jobTitleName(x.getJobTitleName()).startDate(x.getStartDate()).endDate(x.getEndDate()).build();
		});
	}

}
