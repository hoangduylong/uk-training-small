package nts.uk.shr.sample.permit.availability.infra.data;

import javax.persistence.Entity;
import javax.persistence.Table;

import nts.uk.shr.infra.permit.data.JpaEntityOfDescriptionOfAvailabilityPermissionBase;
import nts.uk.shr.sample.permit.availability.dom.SampleDescriptionPermission;

@Entity
@Table(name = "TEST_AVAILPERM")
public class TestDescAvailPerm extends JpaEntityOfDescriptionOfAvailabilityPermissionBase<SampleDescriptionPermission> {

	@Override
	public SampleDescriptionPermission toDomain() {
		return new SampleDescriptionPermission(this);
	}

}
