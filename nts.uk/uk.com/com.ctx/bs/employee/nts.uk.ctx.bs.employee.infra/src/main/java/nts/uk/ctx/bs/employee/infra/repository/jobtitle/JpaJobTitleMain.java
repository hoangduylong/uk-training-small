package nts.uk.ctx.bs.employee.infra.repository.jobtitle;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.jobtitle.main.JobTitleMain;
import nts.uk.ctx.bs.employee.dom.jobtitle.main.JobTitleMainRepository;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobPosMainHist;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobTitleMain;

@Stateless
public class JpaJobTitleMain extends JpaRepository implements JobTitleMainRepository {

	private static final String SELECT_NO_WHERE = "SELECT j, h.startDate, h.endDate FROM BsymtJobTitleMain j "
			+ " INNER JOIN BsymtJobPosMainHist h ON h.histId = j.histId";
	
	private static final String SELECT_JOB_TITLE_MAIN_BY_ID = SELECT_NO_WHERE
			+ " WHERE j.jobTitleId = :jobTitleId";

	private static final String SELECT_BY_EID_STDD = SELECT_NO_WHERE
			+ " WHERE j.sId = :employeeId And h.startDate <= :std And h.endDate >= :std";
	
	private static final String GET_ALL_BY_SID = SELECT_NO_WHERE
			+ " WHERE j.sId = :sid";

	private JobTitleMain toDomain(Object[] entity) {
		return JobTitleMain.creatFromJavaType(String.valueOf(entity[0].toString()), String.valueOf(entity[1].toString()), 
				String.valueOf(entity[2].toString()),
				GeneralDate.fromString(entity[3].toString(), "yyyy-MM-dd"), GeneralDate.fromString(entity[4].toString(), "yyyy-MM-dd"));
	}
	
	private List<JobTitleMain> toListJobTitleMain(List<Object[]> listEntity) {
		List<JobTitleMain> lstJobTitleMain = new ArrayList<>();
		if (!listEntity.isEmpty()) {
			listEntity.stream().forEach(c -> {
				JobTitleMain jobTitleMain = toDomain(c);
				
				lstJobTitleMain.add(jobTitleMain);
			});
		}
		return lstJobTitleMain;
	}
	
	

	@Override
	public Optional<JobTitleMain> getJobTitleMainById(String jobTitleMainId) {
		return this.queryProxy().query(SELECT_JOB_TITLE_MAIN_BY_ID, Object[].class)
				.setParameter("jobTitleId", jobTitleMainId).getSingle(x -> toDomain(x));
	}

	@Override
	public Optional<JobTitleMain> getByEmpIdAndStandDate(String employeeId, GeneralDate standandDate) {
		Optional<Object[]> optData = this.queryProxy().query(SELECT_BY_EID_STDD, Object[].class)
				.setParameter("employeeId", employeeId).setParameter("std", standandDate).getSingle();
		if (optData.isPresent()) {
			Object[] jtm = optData.get();
			return Optional.of(toDomain(jtm));
		}
		return Optional.empty();
	}
	
	

	@Override
	public List<JobTitleMain> getListBiSid(String sid) {
		
		List<Object[]> listEntity = this.queryProxy().query(GET_ALL_BY_SID, Object[].class)
				.setParameter("sid", sid)
				.getList();

		return toListJobTitleMain(listEntity);
	}
	
	/**
	 * Convert from domain to entity
	 * @param domain
	 * @return
	 */
	private BsymtJobTitleMain toEntityJobTitleMain(JobTitleMain domain){
		BsymtJobTitleMain entity = new BsymtJobTitleMain();
		entity.histId = domain.getDateHistoryItem().identifier();
		entity.jobTitleId = domain.getJobTitleId();
		entity.sId = domain.getSid();
		return entity;
	}
	
	/**
	 * Convert from domain to entity BsymtJobPosMainHist
	 * @param domain
	 * @return
	 */
	private BsymtJobPosMainHist toBsymtJobPosMainHist(JobTitleMain domain){
		BsymtJobPosMainHist entity = new BsymtJobPosMainHist();
		entity.histId = domain.getDateHistoryItem().identifier();
		entity.startDate = domain.getDateHistoryItem().start();
		entity.endDate = domain.getDateHistoryItem().end();
		return entity;
	}
	/**
	 * Update entity
	 * @param domain
	 * @return
	 */
	private void updateEntityJobTitleMain(JobTitleMain domain, BsymtJobTitleMain entity){
		entity.histId = domain.getDateHistoryItem().identifier();
		entity.jobTitleId = domain.getJobTitleId();
		entity.sId = domain.getSid();
	}
	
	/**
	 * Update entity BsymtJobPosMainHist
	 * @param domain
	 * @return
	 */
	private void updateBsymtJobPosMainHist(JobTitleMain domain, BsymtJobPosMainHist entity){
		entity.histId = domain.getDateHistoryItem().identifier();
		entity.startDate = domain.getDateHistoryItem().start();
		entity.endDate = domain.getDateHistoryItem().end();
	}
	@Override
	public void addJobTitleMain(JobTitleMain domain) {
		this.commandProxy().insert(toEntityJobTitleMain(domain));
		this.commandProxy().insert(toBsymtJobPosMainHist(domain));
	}

	@Override
	public void updateJobTitleMain(JobTitleMain domain) {
		// TODO Auto-generated method stub
		Optional<BsymtJobTitleMain> existItem = this.queryProxy().find(domain.getJobTitleId(), BsymtJobTitleMain.class);
		Optional<BsymtJobPosMainHist> existItemHst = this.queryProxy().find(domain,BsymtJobPosMainHist.class);
		
		if (!existItem.isPresent() || !existItemHst.isPresent()){
			throw new RuntimeException("invalid JobTitleMain");
		}
		updateBsymtJobPosMainHist(domain, existItemHst.get());
		updateEntityJobTitleMain(domain, existItem.get());
		
		this.commandProxy().update(existItem.get());
		this.commandProxy().update(existItemHst.get());
	}

	@Override
	public void deleteJobTitleMain(String jobTitleMainId) {
		Optional<BsymtJobTitleMain> existItem = this.queryProxy().find(jobTitleMainId, BsymtJobTitleMain.class);
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid JobTitleMain");
		}
		// Remove main table and history table
		this.commandProxy().remove(BsymtJobPosMainHist.class,existItem.get().histId);
		this.commandProxy().remove(BsymtJobTitleMain.class,jobTitleMainId);
	}

}
