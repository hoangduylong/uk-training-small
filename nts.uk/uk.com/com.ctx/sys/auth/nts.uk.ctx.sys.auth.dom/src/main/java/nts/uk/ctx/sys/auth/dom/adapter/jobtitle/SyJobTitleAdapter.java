package nts.uk.ctx.sys.auth.dom.adapter.jobtitle;

import java.util.Optional;

import nts.arc.time.GeneralDate;

/**
 * 
 * @author lamdt
 *
 */
public interface SyJobTitleAdapter {

	Optional<AffJobTitleHistoryImport> gerBySidAndBaseDate(String employeeId, GeneralDate baseDate);
	
}
