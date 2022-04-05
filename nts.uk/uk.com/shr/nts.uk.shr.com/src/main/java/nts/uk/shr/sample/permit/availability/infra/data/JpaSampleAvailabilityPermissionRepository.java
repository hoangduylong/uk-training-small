package nts.uk.shr.sample.permit.availability.infra.data;

import javax.ejb.Stateless;

import nts.uk.shr.infra.permit.data.JpaAvailablityPermissionRepositoryBase;
import nts.uk.shr.sample.permit.availability.dom.SampleAvailabilityPermission;
import nts.uk.shr.sample.permit.availability.dom.SampleAvailabilityPermissionRepository;

@Stateless
public class JpaSampleAvailabilityPermissionRepository
		extends JpaAvailablityPermissionRepositoryBase<SampleAvailabilityPermission, TestAvailPerm>
		implements SampleAvailabilityPermissionRepository {

	@Override
	protected Class<TestAvailPerm> getEntityClass() {
		return TestAvailPerm.class;
	}

	@Override
	protected TestAvailPerm createEmptyEntity() {
		return new TestAvailPerm();
	}

}
