package nts.uk.ctx.sys.portal.dom.toppagesetting;

import java.util.Optional;

public interface PortalJobTitleAdapter {
	/**
	 * get job position by baseDate
	 * @param employeeId
	 * @return
	 * @author yennth
	 */
	Optional<PortalJobTitleImport> getJobPosition(String employeeId);
}
