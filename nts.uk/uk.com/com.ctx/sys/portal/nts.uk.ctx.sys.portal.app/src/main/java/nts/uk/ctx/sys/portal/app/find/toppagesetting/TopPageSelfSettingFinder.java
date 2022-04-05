package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import java.util.Date;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.portal.dom.toppagesetting.JobPosition;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageSelfSetRepository;
import nts.uk.shr.com.context.AppContexts;
/**
 * 
 * @author hoatt
 *
 */
@Stateless
public class TopPageSelfSettingFinder {
	@Inject
	private TopPageSelfSetRepository repository;

	/**
	 * Find top page self set
	 * @return
	 */
	public TopPageSelfSettingDto getTopPageSelfSet(){
		//lay employeeId
		String employeeId = AppContexts.user().employeeId();
		Optional<TopPageSelfSettingDto> lst = this.repository.getTopPageSelfSet(employeeId)
				.map(c->TopPageSelfSettingDto.fromDomain(c));
		if(!lst.isPresent()){
			return null;
		}
		return lst.get();
		
	}
	/**
	 * get job position
	 * @param employeeId
	 * @return
	 */
	public JobPositionDto getJobPosition(String employeeId){
		Date date = new Date();
		GeneralDate systemDate = GeneralDate.legacyDate(date);
		Optional<JobPosition> jp = repository.getJobPosition(employeeId, systemDate);
		JobPositionDto jobPosition = null;
		if(jp.isPresent()){
			jobPosition = JobPositionDto.fromDomain(jp.get());
		}
		return jobPosition;
	}
}
