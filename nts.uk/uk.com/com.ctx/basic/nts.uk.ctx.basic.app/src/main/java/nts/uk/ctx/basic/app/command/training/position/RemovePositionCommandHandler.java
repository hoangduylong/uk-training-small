package nts.uk.ctx.basic.app.command.training.position;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandler;
import nts.uk.ctx.basic.dom.training.position.PositionTraining;
import nts.uk.ctx.basic.dom.training.position.PositionRepositoryTraining;

@Stateless
@Transactional
public class RemovePositionCommandHandler extends CommandHandler<RemovePositionCommand>{
	
	@Inject
	private PositionRepositoryTraining positionRepository;
	
	@Override
	protected void handle(CommandHandlerContext<RemovePositionCommand> context) {

		RemovePositionCommand command = context.getCommand();

		// check if position already exists
		Optional<PositionTraining> domain = positionRepository.findByPositionCode(command.getPositionCode());
		if (!domain.isPresent()) {
			throw new RuntimeException("Position not found");
		}

		// remove position
		positionRepository.remove(command.getPositionCode());
	}
	
}
