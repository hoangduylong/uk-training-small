package nts.uk.ctx.sys.shared.ac;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.company.SyaCompanyHistPub;
import nts.uk.ctx.sys.shared.dom.employee.sycompany.SyaCompanyHistAdapter;
import nts.uk.ctx.sys.shared.dom.employee.sycompany.SyaCompanyHistImport;

@Stateless
public class SyaCompanyHistAdapterImpl implements SyaCompanyHistAdapter {
	
	@Inject
	private SyaCompanyHistPub syaCompanyHistPub;

	@Override
	public Optional<SyaCompanyHistImport> find(String employeeId, GeneralDate baseDate) {
		val optExport = syaCompanyHistPub.find(employeeId, baseDate);
		if (optExport.isPresent()) {
			val export = optExport.get();
			return Optional.of(new SyaCompanyHistImport(
					export.getEmployeeId(), 
					export.getCompanyId(), 
					export.getPeriod()));
		} else {
			return Optional.empty();
		}
	}
}
