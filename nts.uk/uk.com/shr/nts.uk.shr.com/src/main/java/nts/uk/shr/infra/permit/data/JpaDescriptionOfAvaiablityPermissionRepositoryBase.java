package nts.uk.shr.infra.permit.data;

import java.util.List;
import java.util.stream.Collectors;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.shr.com.permit.DescriptionOfAvailabilityPermissionBase;
import nts.uk.shr.com.permit.DescriptionOfAvailabilityPermissionRepositoryBase;

public abstract class JpaDescriptionOfAvaiablityPermissionRepositoryBase<
		D extends DescriptionOfAvailabilityPermissionBase, E extends JpaEntityOfDescriptionOfAvailabilityPermissionBase<D>>
		extends JpaRepository
		implements DescriptionOfAvailabilityPermissionRepositoryBase<D> {

	@Override
	public D find(int functionNo) {
		
		val cb = this.getEntityManager().getCriteriaBuilder();
		val query = cb.createQuery(this.getEntityClass());
		val root = query.from(this.getEntityClass());
		
		query.where(
				cb.equal(root.get("functionNo"), functionNo));
		
		return this.getEntityManager().createQuery(query).getResultList().stream()
				.findFirst()
				.map(e -> e.toDomain())
				.get();
	}
	
	@Override
	public List<D> findAll() {
		val cb = this.getEntityManager().getCriteriaBuilder();
		val query = cb.createQuery(this.getEntityClass());
		val root = query.from(this.getEntityClass());
		query.select(root);
		
		return this.getEntityManager().createQuery(query).getResultList().stream()
				.map(e -> (D)e.toDomain())
				.collect(Collectors.toList());
	}
	
	protected abstract Class<E> getEntityClass();
	
	protected abstract E createEmptyEntity();
}
