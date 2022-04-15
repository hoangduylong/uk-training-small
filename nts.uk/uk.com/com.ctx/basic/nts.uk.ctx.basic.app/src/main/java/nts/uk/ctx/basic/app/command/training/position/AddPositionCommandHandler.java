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
		
		if(command.getPositionName().isEmpty() || command.getPositionName().isEmpty()) {
			throw new RuntimeException("Missing position code or position name field");
		}
		
		// check exists position
		Optional<PositionTraining> position = positionRepository.findByPositionCode(command.getPositionCode());
		if (position.isPresent()) {
			//throw new RuntimeException("This position already exists");
			throw new BusinessException("ER005");
		}
		
		// convert to domain
		PositionTraining domain = PositionTraining.toDomain(command.getPositionCode().trim(), 
															command.getPositionName(), 
															command.getPositionOrder());
				
		// validate
		domain.validate();
				
		//add position
		positionRepository.add(domain);
	}
}
