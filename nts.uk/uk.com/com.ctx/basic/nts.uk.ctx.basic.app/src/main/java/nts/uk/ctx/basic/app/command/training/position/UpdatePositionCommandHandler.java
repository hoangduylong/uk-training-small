package nts.uk.ctx.basic.app.command.training.position;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;

import nts.uk.ctx.basic.dom.training.position.PositionTraining;
import nts.uk.ctx.basic.dom.training.position.PositionRepositoryTraining;


@Stateless
@Transactional
public class UpdatePositionCommandHandler extends CommandHandler<UpdatePositionCommand>{

	@Inject
	private PositionRepositoryTraining positionRepository;
	
	@Override
	protected void handle(CommandHandlerContext<UpdatePositionCommand> context) {
		UpdatePositionCommand command = context.getCommand();
		
		System.out.println("=================yeahhhhhhhhh================\n");
		// check exists position
		Optional<PositionTraining> position = positionRepository.findByPositionCode(command.getPositionCode());
		if (!position.isPresent()) {
			throw new RuntimeException("Position not found");
		}
		
		// convert to domain
		PositionTraining domain = PositionTraining.toDomain(command.getPositionCode(), 
															command.getPositionName(), 
															command.getPositionOrder());
				
		// validate
		domain.validate();
				
		// update position
		positionRepository.update(domain);
	}
	
	public void updateOrder(List<UpdatePositionCommand> commandList) {
		this.positionRepository.updateOrder(commandList.stream()
											.map(command -> command.toDomain(command))
											.collect(Collectors.toList()));
	}
	
}
