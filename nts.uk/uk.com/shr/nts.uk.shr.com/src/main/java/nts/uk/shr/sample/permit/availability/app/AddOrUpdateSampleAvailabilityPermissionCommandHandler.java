package nts.uk.shr.sample.permit.availability.app;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.shr.com.permit.RestoreAvailabilityPermission;
import nts.uk.shr.com.permit.app.SaveAvailabilityPermissionCommandHandler;
import nts.uk.shr.sample.permit.availability.dom.SampleAvailabilityPermission;
import nts.uk.shr.sample.permit.availability.dom.SampleAvailabilityPermissionRepository;

@Stateless
public class AddOrUpdateSampleAvailabilityPermissionCommandHandler
		extends SaveAvailabilityPermissionCommandHandler<SampleAvailabilityPermission, SampleAvailabilityPermissionRepository> {

	@Inject
	private SampleAvailabilityPermissionRepository repository;
	
	@Override
	protected SampleAvailabilityPermissionRepository getInjectedRepository() {
		return this.repository;
	}

	@Override
	protected SampleAvailabilityPermission createDomain(RestoreAvailabilityPermission restore) {
		return new SampleAvailabilityPermission(restore);
	}
}
