package nts.uk.shr.infra.permit.data;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;

import nts.uk.shr.com.permit.AvailabilityPermissionBase;
import nts.uk.shr.com.permit.RestoreAvailabilityPermission;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class JpaEntityOfAvailabilityPermissionBase<D extends AvailabilityPermissionBase> extends ContractUkJpaEntity
		implements RestoreAvailabilityPermission {

	@EmbeddedId
	public JpaEntityOfAvailabilityPermissionId pk;
	
	@Column(name = "IS_AVAILABLE")
	public boolean isAvailable;
	
	public abstract D toDomain();
	
	public static <T extends JpaEntityOfAvailabilityPermissionBase<D>, D extends AvailabilityPermissionBase> T entityFromDomain(
			D domain,
			T entity) {
		
		entity.pk = new JpaEntityOfAvailabilityPermissionId();
		entity.pk.companyId = domain.getCompanyId();
		entity.pk.roleId = domain.getRoleId();
		entity.pk.functionNo = domain.getFunctionNo();
		entity.isAvailable = domain.isAvailable();
		
		return entity;
	}
	
	@Override
	public String companyId() {
		return this.pk.companyId;
	}
	
	@Override
	public String roleId() {
		return this.pk.roleId;
	}
	
	@Override
	public int functionNo() {
		return this.pk.functionNo;
	}
	
	@Override
	public boolean isAvailable() {
		return this.isAvailable;
	}

	@Override
	protected Object getKey() {
		return this.pk;
	}
}
