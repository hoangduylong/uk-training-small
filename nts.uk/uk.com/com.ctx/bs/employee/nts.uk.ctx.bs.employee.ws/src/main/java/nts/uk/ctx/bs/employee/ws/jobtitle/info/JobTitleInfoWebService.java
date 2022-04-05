/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.ws.jobtitle.info;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.find.jobtitle.info.JobTitleInfoFinder;
import nts.uk.ctx.bs.employee.app.find.jobtitle.info.dto.JobTitleInfoFindDto;

/**
 * The Class JobTitleInfoWebService.
 */
@Path("bs/employee/jobtitle/info")
@Produces(MediaType.APPLICATION_JSON)
public class JobTitleInfoWebService extends WebService {
	
	/** The job title info finder. */
	@Inject
	private JobTitleInfoFinder jobTitleInfoFinder;
	
	/**
	 * Find by job id and history id.
	 *
	 * @param findObj the find obj
	 * @return the job title info find dto
	 */
	@Path("findByJobIdAndHistoryId")
	@POST
	public JobTitleInfoFindDto findByJobIdAndHistoryId(JobTitleInfoFindDto findObj) {
		return this.jobTitleInfoFinder.findByJobIdAndHistoryId(findObj.getJobTitleId(), findObj.getJobTitleHistoryId());
	}	

	/**
	 * Find by job code.
	 *
	 * @param findObj the find obj
	 * @return the job title info find dto
	 */
	@Path("findByJobCode")
	@POST
	public JobTitleInfoFindDto findByJobCode(JobTitleInfoFindDto findObj) {
		return this.jobTitleInfoFinder.findByJobCode(findObj.getJobTitleCode());
	}
}
