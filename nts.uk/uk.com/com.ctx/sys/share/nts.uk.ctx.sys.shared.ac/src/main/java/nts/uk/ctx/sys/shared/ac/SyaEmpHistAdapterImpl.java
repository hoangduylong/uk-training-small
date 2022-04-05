package nts.uk.ctx.sys.shared.ac;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.employment.SEmpHistExport;
import nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub;
import nts.uk.ctx.sys.shared.dom.employee.employment.SyaEmpHistAdapter;
import nts.uk.ctx.sys.shared.dom.employee.employment.SyaEmpHistImport;

@Stateless
public class SyaEmpHistAdapterImpl implements SyaEmpHistAdapter {
	
	@Inject
	private SyEmploymentPub syEmploymentPub;

	@Override
	public Optional<SyaEmpHistImport> findBySid(String companyId, String employeeId, GeneralDate baseDate) {
		Optional<SEmpHistExport> optExport = syEmploymentPub.findSEmpHistBySid(companyId, employeeId, baseDate);
		if (optExport.isPresent()) {
			val export = optExport.get();
			return Optional.of(new SyaEmpHistImport(
					export.getEmployeeId(), 
					export.getEmploymentCode(), 
					export.getEmploymentName(),
					export.getPeriod()));
		} else {
			return Optional.empty();
		}
	}

}
