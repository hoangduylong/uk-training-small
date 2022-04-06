package nts.uk.ctx.basic.app.command.training.position;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandler;
import nts.uk.ctx.basic.dom.training.position.Position;
import nts.uk.ctx.basic.dom.training.position.PositionRepository;

@Stateless
@Transactional
public class RemovePositionCommandHandler extends CommandHandler<RemovePositionCommand>{
	
	@Inject
	private PositionRepository positionRepository;
	
	@Override
	protected void handle(CommandHandlerContext<RemovePositionCommand> context) {

		RemovePositionCommand command = context.getCommand();
		
		List<String> positionCodeList = new ArrayList<String>();
		positionCodeList.add(command.getPositionCode());

		// check exists position
		Optional<Position> domain = positionRepository.findByPositionCode(command.getPositionCode());
		if (!domain.isPresent()) {
			throw new RuntimeException("Position not found");
		}

		// delete position
		positionRepository.remove(command.getPositionCode());
	}
	
	
}
