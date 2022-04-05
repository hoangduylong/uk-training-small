package nts.uk.ctx.sys.auth.ac.jobtitle;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.jobtitle.SyJobTitlePub;
import nts.uk.ctx.sys.auth.dom.adapter.jobtitle.AffJobTitleHistoryImport;
import nts.uk.ctx.sys.auth.dom.adapter.jobtitle.SyJobTitleAdapter;

/**
 * 
 * @author lamdt
 *
 */
@Stateless
public class AuthSyJobTitleAdapterImpl implements SyJobTitleAdapter {

	@Inject
	private SyJobTitlePub syJobTitlePub;
	
	@Override
	public Optional<AffJobTitleHistoryImport> gerBySidAndBaseDate(String employeeId, GeneralDate baseDate) {
		val optExportData = syJobTitlePub.gerBySidAndBaseDate(employeeId, baseDate);
		if (optExportData.isPresent()) {
			val exportData = optExportData.get();
			return Optional.of(new AffJobTitleHistoryImport(exportData.companyId, exportData.employeeId, exportData.jobTitleId, exportData.historyItems));
		}
		return Optional.empty();
	}

}
