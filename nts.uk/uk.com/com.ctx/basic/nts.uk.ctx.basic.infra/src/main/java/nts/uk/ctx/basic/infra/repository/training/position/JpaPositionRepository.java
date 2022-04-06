package nts.uk.ctx.basic.infra.repository.training.position;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.basic.dom.training.position.Position;
import nts.uk.ctx.basic.dom.training.position.PositionRepository;
import nts.uk.ctx.basic.infra.entity.training.position.PositionClassification;
import nts.uk.ctx.basic.infra.entity.training.position.PositionClassificationPK;
@Stateless
public class JpaPositionRepository extends JpaRepository implements PositionRepository {
	
	private static final String SELECT_ALL = "SELECT p FROM PositionClassification p";
	
	
	@Override
	public List<Position> findAll() {
		return this.queryProxy().query(SELECT_ALL, PositionClassification.class)
		 .getList(x -> Position.toDomain(
				 x.positionClassificationPK.positionCode, 
				 x.positionName,
				 x.positionOrder));
	}

	
	@Override
	public Optional<Position> findByPositionCode(String positionCode) {
		PositionClassificationPK key = new PositionClassificationPK(positionCode);
		
		return this.queryProxy().find(key, PositionClassification.class)
				.map(x -> Position.toDomain(positionCode, x.positionName, x.positionOrder));
	}


	@Override
	public void add(Position position) {
		this.commandProxy().insert(toEntity(position));
	}


	@Override
	public void update(Position position) {
		PositionClassification p = toEntity(position);
		this.commandProxy().update(p);
	}


	@Override
	public void remove(String positionCode) {
		PositionClassificationPK key = new PositionClassificationPK(positionCode);
		this.commandProxy().remove(PositionClassificationPK.class, key);	
	}
	
	private PositionClassification toEntity(Position domain) {
		PositionClassificationPK key = new PositionClassificationPK(domain.getPositionCode().v());
		PositionClassification entity = 
				new PositionClassification(key, domain.getPositionName().v(), domain.getPositionOrder());
		return entity;
	}


	@Override
	public void updateOrder(List<Position> positionList) {
		this.commandProxy().updateAll(positionList.stream()
				.map(domain -> this.toEntity(domain))
				.collect(Collectors.toList()));
		
	}

}

