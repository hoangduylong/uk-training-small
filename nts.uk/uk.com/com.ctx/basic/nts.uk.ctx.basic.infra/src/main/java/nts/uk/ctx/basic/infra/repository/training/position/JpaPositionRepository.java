package nts.uk.ctx.basic.infra.repository.training.position;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.basic.dom.training.position.PositionTraining;
import nts.uk.ctx.basic.dom.training.position.PositionRepositoryTraining;
import nts.uk.ctx.basic.infra.entity.training.position.PositionClassification;

@Stateless
public class JpaPositionRepository extends JpaRepository implements PositionRepositoryTraining {
	
	private static final String SELECT_ALL = "SELECT p FROM PositionClassification p " + "ORDER BY p.positionOrder ASC";
	private static final String SELECT_ONE = "SELECT p FROM PositionClassification p " + "WHERE p.positionCode = :positionCode";
	
	// get all positions
	@Override
	public List<PositionTraining> findAll() {
		return this.queryProxy().query(SELECT_ALL, PositionClassification.class)
		 .getList(x -> PositionTraining.toDomain(x.positionCode, x.positionName, x.positionOrder));
	}

	
	// find position by position's code
	@Override
	public Optional<PositionTraining> findByPositionCode(String positionCode) {	 
		 return this.queryProxy().query(SELECT_ONE, PositionClassification.class)
				 .setParameter("positionCode", positionCode)
				 .getSingle(x -> PositionTraining.toDomain( x.positionCode, x.positionName, x.positionOrder));
	}

	
	// add position
	@Override
	public void add(PositionTraining position) {
		this.commandProxy().insert(toEntity(position));
	}
	
	
	// remove position by position's code
	@Override
	public void remove(String positionCode) {
		this.commandProxy().remove(PositionClassification.class, positionCode);
	}
	
	
	// update position
	@Override
	public void update(PositionTraining position) {
		this.commandProxy().update(this.toEntity(position));
	}

	
	// update all positions' order
	@Override
	public void updateOrder(List<PositionTraining> positionList) {
		this.commandProxy().updateAll(positionList.stream()
				.map(domain -> this.toEntity(domain))
				.collect(Collectors.toList()));
	}

	
	// convert domain into entity
	private PositionClassification toEntity(PositionTraining domain) {
		String key = domain.getPositionCode().v();
		PositionClassification entity = 
				new PositionClassification(key, domain.getPositionName().v(), domain.getPositionOrder());
		return entity;
	}

}
