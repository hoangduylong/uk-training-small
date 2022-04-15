package nts.uk.ctx.basic.ws.jobtitle;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.basic.app.command.training.jobtitle.AddJobTitleCommandHandler;
import nts.uk.ctx.basic.app.command.training.jobtitle.JobTitleCommand;
import nts.uk.ctx.basic.app.command.training.jobtitle.UpdateJobTitleCommandHandler;
import nts.uk.ctx.basic.app.find.training.jobtitle.JobTitleFinder;
import nts.uk.ctx.basic.app.find.training.jobtitle.JobTitleFinderTraining;
import nts.uk.ctx.basic.app.find.training.jobtitle.dto.JobTitleDtoTraining;

@Path("basic/training/jobtitle/")
@Produces(MediaType.APPLICATION_JSON)
public class JobTitleWebService extends WebService{
	
	@Inject
	private AddJobTitleCommandHandler addJobTitleCommandHandler;
	
	@Inject
	private UpdateJobTitleCommandHandler updateJobTitleCommandHandler;
	
	@Inject
	private JobTitleFinderTraining jobTitleFinder;
	
	/**
	 * add job title
	 * @param command
	 */
	@POST
	@Path("add")
	public void add(JobTitleCommand command) {
		this.addJobTitleCommandHandler.handle(command);
	}
    
	/**
	 * update job title
	 * @param command
	 */
	@POST
	@Path("update")
	public void update(JobTitleCommand command) {
		this.updateJobTitleCommandHandler.handle(command);
	}

	/**
	 * find all job title
	 * @return list of job title
	 */
	@POST
	@Path("find/all")
	public List<JobTitleDtoTraining> findAll() {
		return this.jobTitleFinder.findAll();
	}
	
	/**
	 * find one job title by code/id
	 * @param jobTitleId
	 * @return one of job title
	 */
	@POST
	@Path("find")
	public JobTitleDtoTraining find(JobTitleFinder obj) {
		return this.jobTitleFinder.find(obj);
	}
	
}
