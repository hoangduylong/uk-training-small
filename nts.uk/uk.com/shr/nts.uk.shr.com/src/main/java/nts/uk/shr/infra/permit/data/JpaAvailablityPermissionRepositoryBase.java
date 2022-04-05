package nts.uk.shr.infra.permit.data;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.val;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.shr.com.permit.AvailabilityPermissionBase;
import nts.uk.shr.com.permit.AvailabilityPermissionRepositoryBase;

public abstract class JpaAvailablityPermissionRepositoryBase<D extends AvailabilityPermissionBase, E extends JpaEntityOfAvailabilityPermissionBase<D>>
		extends JpaRepository
		implements AvailabilityPermissionRepositoryBase<D> {

	@Override
	public Optional<D> find(String companyId, String roleId, int functionNo) {
		
		val cb = this.getEntityManager().getCriteriaBuilder();
		val query = cb.createQuery(this.getEntityClass());
		val root = query.from(this.getEntityClass());
		
		query.where(
				cb.equal(root.get("pk").get("companyId"), companyId),
				cb.equal(root.get("pk").get("roleId"), roleId),
				cb.equal(root.get("pk").get("functionNo"), functionNo),
				cb.equal(root.get("isAvailable"), true));
		
		return this.getEntityManager().createQuery(query).getResultList().stream()
				.findFirst()
				.map(e -> e.toDomain());
	}
	
	@Override
	public List<D> find(String companyId, String roleId, List<String> functionNoList) {
		val cb = this.getEntityManager().getCriteriaBuilder();
		
		List<E> resultList = new ArrayList<>();
		CollectionUtil.split(functionNoList, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			val query = cb.createQuery(this.getEntityClass());
			val root = query.from(this.getEntityClass());
			
			query.where(
					cb.equal(root.get("pk").get("companyId"), companyId),
					cb.equal(root.get("pk").get("roleId"), roleId),
					root.get("pk").get("functionNo").in(subList));
			
			resultList.addAll(this.getEntityManager().createQuery(query).getResultList());
		});
		return resultList.stream()
				.map(e -> (D)e.toDomain())
				.collect(Collectors.toList());
	}
	
	@Override
	public void add(D permission) {
		val entity = JpaEntityOfAvailabilityPermissionBase.entityFromDomain(permission, this.createEmptyEntity());
		this.commandProxy().insert(entity);
	}
	
	@Override
	public void update(D permission) {
		val entity = JpaEntityOfAvailabilityPermissionBase.entityFromDomain(permission, this.createEmptyEntity());
		this.commandProxy().update(entity);
	}
	
	protected abstract Class<E> getEntityClass();
	
	protected abstract E createEmptyEntity();
}
