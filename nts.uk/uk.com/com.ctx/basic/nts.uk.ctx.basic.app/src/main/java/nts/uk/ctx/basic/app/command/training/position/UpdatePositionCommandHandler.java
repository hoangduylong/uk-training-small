package nts.uk.ctx.basic.app.command.training.position;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;

import nts.uk.ctx.basic.dom.training.position.Position;
import nts.uk.ctx.basic.dom.training.position.PositionRepository;


@Stateless
@Transactional
public class UpdatePositionCommandHandler extends CommandHandler<UpdatePositionCommand>{

	@Inject
	private PositionRepository positionRepository;
	
	@Override
	protected void handle(CommandHandlerContext<UpdatePositionCommand> context) {
		UpdatePositionCommand command = context.getCommand();
		
		// check exists position
		Optional<Position> position = positionRepository.findByPositionCode(command.getPositionCode());
		if (!position.isPresent()) {
			throw new RuntimeException("Position not found");
		}
		
		// convert to domain
		Position domain = Position.toDomain(command.getPositionCode(), 
											command.getPositionName(), 
											command.getPositionOrder());
				
		// validate
		domain.validate();
				
		// update position
		positionRepository.update(domain);
		
		
//		public void updateOrder(List<UpdatePositionCommand> listCommand) {
//			this.repository.updateOrder(listCommand.stream().map(command -> Position.toDomain(companyId)).collect(Collectors.toList()));
//		}
		
	}}
