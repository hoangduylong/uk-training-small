/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.ws.jobtitle.sequence;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.command.jobtitle.sequence.RemoveSequenceCommand;
import nts.uk.ctx.bs.employee.app.command.jobtitle.sequence.RemoveSequenceCommandHandler;
import nts.uk.ctx.bs.employee.app.command.jobtitle.sequence.SaveSequenceCommand;
import nts.uk.ctx.bs.employee.app.command.jobtitle.sequence.SaveSequenceCommandHandler;
import nts.uk.ctx.bs.employee.app.find.jobtitle.sequence.SequenceMasterFinder;
import nts.uk.ctx.bs.employee.app.find.jobtitle.sequence.dto.SequenceMasterFindDto;

/**
 * The Class SequenceMasterWebService.
 */
@Path("bs/employee/jobtitle/sequence")
@Produces(MediaType.APPLICATION_JSON)
public class SequenceMasterWebService extends WebService {

	/** The sequence master finder. */
	@Inject
	private SequenceMasterFinder sequenceMasterFinder;
	
	/** The save sequence command handler. */
	@Inject
	private SaveSequenceCommandHandler saveSequenceCommandHandler;
	
	/** The remove sequence command handler. */
	@Inject
	private RemoveSequenceCommandHandler removeSequenceCommandHandler;
	
	/**
	 * Find all sequence.
	 *
	 * @return the list
	 */
	@Path("findAll")
	@POST
	public List<SequenceMasterFindDto> findAllSequence() {
		return this.sequenceMasterFinder.findAll();
	}
	
	/**
	 * Find sequence by sequence code.
	 *
	 * @param findObj the find obj
	 * @return the sequence master find dto
	 */
	@Path("find")
	@POST
	public SequenceMasterFindDto findSequenceBySequenceCode(SequenceMasterFindDto findObj) {
		return this.sequenceMasterFinder.findSequenceBySequenceCode(findObj.getSequenceCode());
	}
	
	/**
	 * Save sequence.
	 *
	 * @param command the command
	 */
	@Path("save")
	@POST
	public void saveSequence(SaveSequenceCommand command) {
		this.saveSequenceCommandHandler.handle(command);
	}
	
	/**
	 * Removes the sequence.
	 *
	 * @param command the command
	 */
	@Path("remove")
	@POST
	public void removeSequence(RemoveSequenceCommand command) {
		this.removeSequenceCommandHandler.handle(command);
	}
	
	/**
	 * Update order.
	 *
	 * @param listCommand the list command
	 */
	@Path("updateOrder")
	@POST
	public void updateOrder(List<SaveSequenceCommand> listCommand) {
		this.saveSequenceCommandHandler.updateOrder(listCommand);
	}
}
