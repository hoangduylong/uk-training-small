package nts.uk.ctx.sys.auth.pub.grant;

import java.util.Optional;

public interface RoleSetGrantedPublisher {

	Optional<RoleSetGrantedPersonDto> getPersonGranted(String employeeId);
	
	Optional<RoleSetGrantedJobTitleDto> getJobTitleGranted(String companyId);
}
