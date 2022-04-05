package nts.uk.shr.sample.permit.availability.infra.data;

import javax.ejb.Stateless;

import nts.uk.shr.infra.permit.data.JpaDescriptionOfAvaiablityPermissionRepositoryBase;
import nts.uk.shr.sample.permit.availability.dom.SampleDescriptionPermission;
import nts.uk.shr.sample.permit.availability.dom.SampleDescriptionPermissionRepository;

@Stateless
public class JpaSampleDescriptionPermissionRepository
		extends JpaDescriptionOfAvaiablityPermissionRepositoryBase<SampleDescriptionPermission, TestDescAvailPerm>
		implements SampleDescriptionPermissionRepository {

	@Override
	protected Class<TestDescAvailPerm> getEntityClass() {
		return TestDescAvailPerm.class;
	}

	@Override
	protected TestDescAvailPerm createEmptyEntity() {
		return new TestDescAvailPerm();
	}

}
