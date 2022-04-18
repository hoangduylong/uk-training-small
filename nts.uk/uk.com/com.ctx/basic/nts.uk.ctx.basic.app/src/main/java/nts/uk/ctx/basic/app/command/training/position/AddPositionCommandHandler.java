package nts.uk.ctx.basic.app.command.training.position;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;

import nts.uk.ctx.basic.dom.training.position.PositionTraining;
import nts.uk.ctx.basic.dom.training.position.PositionRepositoryTraining;

@Stateless
@Transactional
public class AddPositionCommandHandler extends CommandHandler<AddPositionCommand>{

	@Inject
	private PositionRepositoryTraining positionRepository;
	
	@Override
	protected void handle(CommandHandlerContext<AddPositionCommand> context) {
		AddPositionCommand command = context.getCommand();
		
		// check if any the data field is missing
		if(command.getPositionName().isEmpty() || command.getPositionName().isEmpty()) {
			throw new RuntimeException("Missing position code or position name field");
		}
		
		// check if position already exists
		Optional<PositionTraining> position = positionRepository.findByPositionCode(command.getPositionCode());
		if (position.isPresent()) {
			throw new BusinessException("ER005");
		}
		
		// convert into domain
		PositionTraining domain = PositionTraining.toDomain(command.getPositionCode().trim(), 
															command.getPositionName(), 
															command.getPositionOrder());
				
		// validate
		domain.validate();
				
		//add position
		positionRepository.add(domain);
	}
}
