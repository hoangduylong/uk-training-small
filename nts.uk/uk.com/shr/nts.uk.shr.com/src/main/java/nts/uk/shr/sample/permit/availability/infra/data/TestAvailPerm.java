package nts.uk.shr.sample.permit.availability.infra.data;

import javax.persistence.Entity;
import javax.persistence.Table;

import nts.uk.shr.infra.permit.data.JpaEntityOfAvailabilityPermissionBase;
import nts.uk.shr.sample.permit.availability.dom.SampleAvailabilityPermission;

@Entity
@Table(name = "TEST_AVAILPERM")
public class TestAvailPerm extends JpaEntityOfAvailabilityPermissionBase<SampleAvailabilityPermission> {

	@Override
	public SampleAvailabilityPermission toDomain() {
		return new SampleAvailabilityPermission(this);
	}

}
