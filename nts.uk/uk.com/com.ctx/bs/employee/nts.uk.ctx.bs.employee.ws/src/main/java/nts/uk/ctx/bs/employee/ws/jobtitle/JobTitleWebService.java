/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.ws.jobtitle;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.command.jobtitle.RemoveJobTitleCommand;
import nts.uk.ctx.bs.employee.app.command.jobtitle.RemoveJobTitleCommandHandler;
import nts.uk.ctx.bs.employee.app.command.jobtitle.SaveJobTitleCommand;
import nts.uk.ctx.bs.employee.app.command.jobtitle.SaveJobTitleCommandHandler;
import nts.uk.ctx.bs.employee.app.command.jobtitle.history.RemoveJobTitleHistoryCommand;
import nts.uk.ctx.bs.employee.app.command.jobtitle.history.RemoveJobTitleHistoryCommandHandler;
import nts.uk.ctx.bs.employee.app.command.jobtitle.history.SaveJobTitleHistoryCommand;
import nts.uk.ctx.bs.employee.app.command.jobtitle.history.SaveJobTitleHistoryCommandHandler;
import nts.uk.ctx.bs.employee.app.find.jobtitle.JobTitleFinder;
import nts.uk.ctx.bs.employee.app.find.jobtitle.dto.JobTitleFindDto;
import nts.uk.ctx.bs.employee.app.find.jobtitle.dto.JobTitleItemDto;

/**
 * The Class JobTitleWebService.
 */
@Path("bs/employee/jobtitle")
@Produces(MediaType.APPLICATION_JSON)
public class JobTitleWebService extends WebService {

	/** The job title finder. */
	@Inject
	private JobTitleFinder jobTitleFinder;
	
	/** The save job title command handler. */
	@Inject
	private SaveJobTitleCommandHandler saveJobTitleCommandHandler;
	
	/** The remove job title command handler. */
	@Inject
	private RemoveJobTitleCommandHandler removeJobTitleCommandHandler;
	
	/** The save job title history command handler. */
	@Inject
	private SaveJobTitleHistoryCommandHandler saveJobTitleHistoryCommandHandler;
	
	/** The remove job title history command handler. */
	@Inject
	private RemoveJobTitleHistoryCommandHandler removeJobTitleHistoryCommandHandler;
	
	/**
	 * Find all.
	 *
	 * @param dto the dto
	 * @return the list
	 */
	@Path("findAll")
	@POST
	public List<JobTitleItemDto> findAll(Kcp003Dto dto) {
		return this.jobTitleFinder.findAll(dto.getBaseDate());
	}
	
	/**
	 * Save job title.
	 *
	 * @param command the command
	 */
	@Path("save")
	@POST
	public void saveJobTitle(SaveJobTitleCommand command) {
		this.saveJobTitleCommandHandler.handle(command);
	}
	
	/**
	 * Removes the job title.
	 *
	 * @param command the command
	 */
	@Path("remove")
	@POST
	public void removeJobTitle(RemoveJobTitleCommand command) {
		this.removeJobTitleCommandHandler.handle(command);
	}
	
	/**
	 * Find by job id.
	 *
	 * @param findObj the find obj
	 * @return the job title find dto
	 */
	@Path("history/findByJobId")
	@POST
	public JobTitleFindDto findByJobId(JobTitleFindDto findObj) {
		return this.jobTitleFinder.findJobHistoryByJobId(findObj.getJobTitleId());
	}	
	
	/**
	 * Save history.
	 *
	 * @param command the command
	 */
	@Path("history/save")
	@POST
	public void saveHistory(SaveJobTitleHistoryCommand command) {
		this.saveJobTitleHistoryCommandHandler.handle(command);
	}
	
	/**
	 * Removes the history.
	 *
	 * @param command the command
	 */
	@Path("history/remove")
	@POST
	public void removeHistory(RemoveJobTitleHistoryCommand command) {
		this.removeJobTitleHistoryCommandHandler.handle(command);
	}
	
	@Path("getNamesByIds")
	@POST
	public List<String> getNamesByIds(List<String> listId) {
		List<String> names = new ArrayList<>();
		if (listId == null || listId.isEmpty()) return names;
		names = this.jobTitleFinder.findNamesByIds(listId);
		return names;
	}
}
