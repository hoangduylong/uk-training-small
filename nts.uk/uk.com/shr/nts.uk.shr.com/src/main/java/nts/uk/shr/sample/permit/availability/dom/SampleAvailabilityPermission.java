package nts.uk.shr.sample.permit.availability.dom;

import nts.uk.shr.com.permit.AvailabilityPermissionBase;
import nts.uk.shr.com.permit.RestoreAvailabilityPermission;

public class SampleAvailabilityPermission extends AvailabilityPermissionBase {

	public SampleAvailabilityPermission(RestoreAvailabilityPermission restore) {
		// just only call super constructor
		super(restore);
	}

}
