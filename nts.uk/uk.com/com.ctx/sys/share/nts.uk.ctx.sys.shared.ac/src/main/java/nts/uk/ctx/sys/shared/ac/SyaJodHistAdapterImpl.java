package nts.uk.ctx.sys.shared.ac;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.pub.jobtitle.EmployeeJobHistExport;
import nts.uk.ctx.bs.employee.pub.jobtitle.SyJobTitlePub;
import nts.uk.ctx.sys.shared.dom.employee.syjobtitle.SyaJobHistAdapter;
import nts.uk.ctx.sys.shared.dom.employee.syjobtitle.SyaJobHistImport;

@Stateless
public class SyaJodHistAdapterImpl implements SyaJobHistAdapter {

	@Inject
	private SyJobTitlePub syJobTitlePub;

	@Override
	public Optional<SyaJobHistImport> findBySid(String companyId, String employeeId, GeneralDate baseDate) {
		Optional<EmployeeJobHistExport> optExport = syJobTitlePub.findSJobHistBySId(employeeId, baseDate);
		if (optExport.isPresent()) {
			val export = optExport.get();
			return Optional.of(new SyaJobHistImport(
					export.getEmployeeId(), 
					export.getJobTitleID(), 
					export.getJobTitleName(),
					new DatePeriod(export.getStartDate(), export.getEndDate())));
		} else {
			return Optional.empty();
		}
	}

}
