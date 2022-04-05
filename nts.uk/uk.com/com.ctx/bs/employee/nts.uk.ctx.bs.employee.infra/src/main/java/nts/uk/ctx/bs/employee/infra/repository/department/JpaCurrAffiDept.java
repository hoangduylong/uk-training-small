package nts.uk.ctx.bs.employee.infra.repository.department;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.department.CurrentAffiDept;
import nts.uk.ctx.bs.employee.dom.department.CurrentAffiDeptRepository;
import nts.uk.ctx.bs.employee.infra.entity.department.BsymtCurrAffiDept;
import nts.uk.ctx.bs.employee.infra.entity.department.BsymtCurrAffiDeptHist;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
public class JpaCurrAffiDept extends JpaRepository implements CurrentAffiDeptRepository {
	private static final String SELECT_NO_WHERE = "SELECT c, h.strD, h.endD FROM BsymtCurrAffiDeptHist h"
			+ " INNER JOIN BsymtCurrAffiDept c ON c.histId = h.historyId";
	private static final String SELECT_CURR_AFF_DEPT_BY_ID = SELECT_NO_WHERE
			+ " WHERE c.bsymtCurrAffiDeptPK.affiDeptId = :affiDeptId";

	private CurrentAffiDept toDomain(List<Object[]> entity) {
		
		CurrentAffiDept currentAffiDept = new CurrentAffiDept(String.valueOf(entity.get(0)[0].toString())
				, String.valueOf(entity.get(0)[1].toString()), 
				String.valueOf(entity.get(0)[2].toString()), 
				entity.stream().map(x -> new DateHistoryItem(String.valueOf(x[3].toString()), 
						new DatePeriod(GeneralDate.fromString(String.valueOf(x[4].toString()), ""), 
								GeneralDate.fromString(String.valueOf(x[5].toString()), "")))).collect(Collectors.toList()));
		return currentAffiDept;
	}

	@Override
	public CurrentAffiDept getCurrentAffiDeptById(String currentAffiDeptById) {
		List<Object[]> currentAffiDept = this.queryProxy()
				.query(SELECT_CURR_AFF_DEPT_BY_ID, Object[].class)
				.setParameter("affiDeptId", currentAffiDeptById).getList();
		return toDomain(currentAffiDept);
	}
	/**
	 * Update from domain to entity
	 * @param domain
	 * @param entity
	 */
	private void updateEntity(CurrentAffiDept domain,BsymtCurrAffiDept entity){
		entity.sid = domain.getEmployeeId();
		entity.depId = domain.getDepartmentId();
	}
	
	private BsymtCurrAffiDept toEntity(CurrentAffiDept domain){
		return new BsymtCurrAffiDept(domain.getAffiDeptId(),domain.getEmployeeId(),domain.getDepartmentId(),domain.getDateHistoryItem().get(0).identifier());
	}
	
	private BsymtCurrAffiDeptHist toBsymtCurrAffiDeptHist(DateHistoryItem item){
		return new BsymtCurrAffiDeptHist(item.identifier(),item.start(),item.end());
	}
	/**
	 * Update history table from domain
	 * @param item
	 * @param entity
	 */
	private void updateEntityBsymtAssiWorkplaceHist(DateHistoryItem item,BsymtCurrAffiDeptHist entity){
		entity.setStrD(item.start());
		entity.setEndD(item.end());
	}
	
	@Override
	public void updateCurrentAffiDept(CurrentAffiDept domain) {
		Optional<BsymtCurrAffiDept> existItem = this.queryProxy().find(domain.getAffiDeptId(), BsymtCurrAffiDept.class);
		
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid Assign workplace");
		}
		
		// Update history
		for (DateHistoryItem item : domain.getDateHistoryItem()){
			Optional<BsymtCurrAffiDeptHist> existItemHist = this.queryProxy().find(item.identifier(), BsymtCurrAffiDeptHist.class);
			
			if (!existItemHist.isPresent()){
				throw new RuntimeException("invalid BsymtCurrAffiDeptHist");
			}
			updateEntityBsymtAssiWorkplaceHist(item,existItemHist.get());
			this.commandProxy().update(existItemHist.get());
		}
		
		// Update entity
		updateEntity(domain, existItem.get());
		
		this.commandProxy().update(existItem.get());
	}

	@Override
	public void deleteCurrentAffiDept(String currrentAffiDeptId) {
		Optional<BsymtCurrAffiDept> existItem = this.queryProxy().find(currrentAffiDeptId, BsymtCurrAffiDept.class);
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid Assign workplace");
		}
		this.commandProxy().remove(BsymtCurrAffiDept.class,currrentAffiDeptId);
		
		Optional<BsymtCurrAffiDeptHist> existItemHist = this.queryProxy().find(existItem.get().histId, BsymtCurrAffiDeptHist.class);
		
		if (!existItemHist.isPresent()){
			throw new RuntimeException("invalid BsymtCurrAffiDeptHist");
		}
		this.commandProxy().remove(BsymtCurrAffiDeptHist.class, existItemHist.get().getHistoryId());
	}

	@Override
	public void addCurrentAffiDept(CurrentAffiDept domain) {
		if (domain.getDateHistoryItem().isEmpty()){
			return;
		}
		this.commandProxy().insert(toEntity(domain));
		for(DateHistoryItem item : domain.getDateHistoryItem()){
			this.commandProxy().insert(toBsymtCurrAffiDeptHist(item));
		}
	}

}
