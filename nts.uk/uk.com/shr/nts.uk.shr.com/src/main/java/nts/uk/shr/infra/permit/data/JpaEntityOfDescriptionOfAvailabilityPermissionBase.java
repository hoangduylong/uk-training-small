package nts.uk.shr.infra.permit.data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;

import nts.uk.shr.com.permit.DescriptionOfAvailabilityPermissionBase;
import nts.uk.shr.com.permit.RestoreDescriptionOfAvailabilityPermission;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class JpaEntityOfDescriptionOfAvailabilityPermissionBase<D extends DescriptionOfAvailabilityPermissionBase> extends UkJpaEntity
		implements RestoreDescriptionOfAvailabilityPermission {

	@Id
	@Column(name = "FUNCTION_NO")
	public int functionNo;

	@Column(name = "FUNCTION_NAME")
	public String name;

	@Column(name = "EXPLANATION")
	public String explanation;

	@Column(name = "DISPLAY_ORDER")
	public int displayOrder;

	@Column(name = "DEFAULT_VALUE")
	public boolean defaultValue;
	
	public abstract D toDomain();
	
	public static <T extends JpaEntityOfDescriptionOfAvailabilityPermissionBase<D>, D extends DescriptionOfAvailabilityPermissionBase> T entityFromDomain(
			D domain,
			T entity) {
		
		entity.functionNo = domain.getFunctionNo();
		entity.name = domain.getName();
		entity.explanation = domain.getExplanation();
		entity.displayOrder = domain.getDisplayOrder();
		entity.defaultValue = domain.getDefaultValue();
		
		return entity;
	}
	
	@Override
	public int functionNo() {
		return this.functionNo;
	}
	
	@Override
	public String name() {
		return this.name;
	}
	
	@Override
	public String explanation() {
		return this.explanation;
	}
	
	@Override
	public int displayOrder() {
		return this.displayOrder;
	}
	
	@Override
	public boolean defaultValue() {
		return this.defaultValue;
	}
	
	@Override
	protected Object getKey() {
		return this.functionNo;
	}

}
