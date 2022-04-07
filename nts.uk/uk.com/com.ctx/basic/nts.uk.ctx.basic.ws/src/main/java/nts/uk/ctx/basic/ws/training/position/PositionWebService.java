package nts.uk.ctx.basic.ws.training.position;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.basic.app.command.training.position.AddPositionCommand;
import nts.uk.ctx.basic.app.command.training.position.AddPositionCommandHandler;
import nts.uk.ctx.basic.app.command.training.position.RemovePositionCommand;
import nts.uk.ctx.basic.app.command.training.position.RemovePositionCommandHandler;
import nts.uk.ctx.basic.app.command.training.position.UpdatePositionCommand;
import nts.uk.ctx.basic.app.command.training.position.UpdatePositionCommandHandler;
import nts.uk.ctx.basic.app.find.training.position.PositionFinder;
import nts.uk.ctx.basic.app.find.training.position.dto.PositionDto;


@Path("basic/training/position")
@Produces(MediaType.APPLICATION_JSON)
public class PositionWebService extends WebService{
	

	@Inject
	private AddPositionCommandHandler addPositionCommandHandler;

	@Inject
	private UpdatePositionCommandHandler updatePositionCommandHandler;
	
	@Inject
	private RemovePositionCommandHandler removePositionCommandHandler;
	
	@Inject
	private PositionFinder positionFinder;

	
	/**
	 * add position
	 * @param command
	 */
	@POST
	@Path("add")
	public void add(AddPositionCommand command) {
		this.addPositionCommandHandler.handle(command);
	}
    
	/**
	 * update position
	 * @param command
	 */
	@POST
	@Path("update")
	public void update(UpdatePositionCommand command) {
		this.updatePositionCommandHandler.handle(command);
	}
	
	/**
	 * remove position
	 * @param command
	 */
	@POST
	@Path("remove")
	public void remove(RemovePositionCommand command) {
		this.removePositionCommandHandler.handle(command);
	}
	
	/**
	 * find all position
	 * @return
	 */
	@POST
	@Path("findAll")
	public List<PositionDto> findAll() {
		return this.positionFinder.findAll();
	}
	
	
	/**
	 * find by positionCode
	 * @return
	 */
	@POST
	@Path("findByPositionCode")
	public PositionDto findByPositionCode(String positionCode) {
		return this.positionFinder.findByPositionCode(positionCode);
	}

}
