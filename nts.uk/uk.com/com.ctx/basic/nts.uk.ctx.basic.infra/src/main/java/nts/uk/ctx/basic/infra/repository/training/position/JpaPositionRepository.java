package nts.uk.ctx.basic.infra.repository.training.position;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.basic.dom.training.position.PositionTraining;
import nts.uk.ctx.basic.dom.training.position.PositionCodeTraining;
import nts.uk.ctx.basic.dom.training.position.PositionNameTraining;
import nts.uk.ctx.basic.dom.training.position.PositionRepositoryTraining;
import nts.uk.ctx.basic.infra.entity.training.position.PositionClassification;
import nts.uk.ctx.basic.infra.entity.training.position.PositionClassificationPK;
@Stateless
public class JpaPositionRepository extends JpaRepository implements PositionRepositoryTraining {
	
	private static final String SELECT_ALL = "SELECT p FROM PositionClassification p";
	
	
	@Override
	public List<PositionTraining> findAll() {
		return this.queryProxy().query(SELECT_ALL, PositionClassification.class)
		 .getList(x -> PositionTraining.toDomain(
				 x.positionClassificationPK.positionCode, 
				 x.positionName,
				 x.positionOrder));
	}

	
	@Override
	public Optional<PositionTraining> findByPositionCode(String positionCode) {
		PositionClassificationPK key = new PositionClassificationPK(positionCode);
		
		return this.queryProxy().find(key, PositionClassification.class)
				.map(x -> PositionTraining.toDomain(positionCode, x.positionName, x.positionOrder));
	}


	@Override
	public void add(PositionTraining position) {
		this.commandProxy().insert(toEntity(position));
	}
	
	
	@Override
	public void remove(String positionCode) {
		PositionClassificationPK key = new PositionClassificationPK(positionCode);
		this.commandProxy().remove(PositionClassificationPK.class, key);
	}
	

	@Override
	public void update(PositionTraining position) {
		PositionClassification p = toEntity(position);
		this.commandProxy().update(p);
	}


	@Override
	public void updateOrder(List<PositionTraining> positionList) {
		this.commandProxy().updateAll(positionList.stream()
				.map(domain -> this.toEntity(domain))
				.collect(Collectors.toList()));
	}
	
	
	// convert domain to entity 
	private PositionClassification toEntity(PositionTraining domain) {
		PositionClassificationPK key = new PositionClassificationPK(domain.getPositionCode().v());
		PositionClassification entity = 
				new PositionClassification(key, domain.getPositionName().v(), domain.getPositionOrder());
		return entity;
	}
	
}
