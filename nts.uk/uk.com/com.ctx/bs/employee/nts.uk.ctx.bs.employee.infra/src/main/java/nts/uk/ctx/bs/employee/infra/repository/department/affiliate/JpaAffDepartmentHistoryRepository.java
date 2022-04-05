package nts.uk.ctx.bs.employee.infra.repository.department.affiliate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistory;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryRepository;
import nts.uk.ctx.bs.employee.infra.entity.department.BsymtAffiDepartmentHist;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
public class JpaAffDepartmentHistoryRepository  extends JpaRepository implements AffDepartmentHistoryRepository{
	private static final String QUERY_GET_AFFDEPARTMENT_BYSID = "SELECT ad FROM BsymtAffiDepartmentHist ad"
			+ " WHERE ad.sid = :sid and ad.cid = :cid ORDER BY ad.strDate";
	
	private static final String QUERY_GET_AFFDEPARTMENT_BYSID_DESC = QUERY_GET_AFFDEPARTMENT_BYSID + " DESC";
	
	private static final String SELECT_BY_EMPID_STANDARDDATE = "SELECT ad FROM BsymtAffiDepartmentHist ad"
			+ " WHERE ad.sid = :employeeId AND ad.strDate <= :standardDate "
			+ " AND ad.endDate >= :standardDate  ";
	
	private static final String SELECT_BY_HISTID = "SELECT ad FROM BsymtAffiDepartmentHist ad"
			+ " WHERE ad.hisId = :historyId";
	
	private AffDepartmentHistory toAffDepartment(List<BsymtAffiDepartmentHist> listHist){
		AffDepartmentHistory affDepart = new AffDepartmentHistory(listHist.get(0).getCid(), listHist.get(0).getSid(), new ArrayList<>());
		DateHistoryItem dateItem = null;
		for (BsymtAffiDepartmentHist item : listHist){
			dateItem = new DateHistoryItem(item.getHisId(), new DatePeriod(item.getStrDate(), item.getEndDate()));
			affDepart.getHistoryItems().add(dateItem);
		}
		return affDepart;
	}
	
	@Override
	public Optional<AffDepartmentHistory> getByEmployeeId(String cid, String employeeId) {

		List<BsymtAffiDepartmentHist> listHist = this.queryProxy()
				.query(QUERY_GET_AFFDEPARTMENT_BYSID, BsymtAffiDepartmentHist.class)
				.setParameter("sid", employeeId)
				.setParameter("cid", cid).getList();
		if (listHist != null && !listHist.isEmpty()) {
			return Optional.of(toAffDepartment(listHist));
		}
		return Optional.empty();
	}

	@Override
	public Optional<AffDepartmentHistory> getByEmployeeIdDesc(String cid, String employeeId) {

		List<BsymtAffiDepartmentHist> listHist = this.queryProxy()
				.query(QUERY_GET_AFFDEPARTMENT_BYSID_DESC, BsymtAffiDepartmentHist.class)
				.setParameter("sid", employeeId).
				setParameter("cid", cid).getList();
		if (listHist != null && !listHist.isEmpty()) {
			return Optional.of(toAffDepartment(listHist));
		}
		return Optional.empty();
	}

	@Override
	public void add(String cid, String sid, DateHistoryItem domain) {
		this.commandProxy().insert(toEntity(cid, sid, domain));
	}

	@Override
	public void update(DateHistoryItem domain) {
		Optional<BsymtAffiDepartmentHist> itemToBeUpdated = this.queryProxy().find(domain.identifier(), BsymtAffiDepartmentHist.class);
		if (!itemToBeUpdated.isPresent()){
			throw new RuntimeException("Invalid BsymtAffiDepartmentHist");
		}
		updateEntity(domain, itemToBeUpdated.get());
		this.commandProxy().update(itemToBeUpdated.get());
	}

	@Override
	public void delete(String histId) {
		Optional<BsymtAffiDepartmentHist> itemToBeDeleted = this.queryProxy().find(histId, BsymtAffiDepartmentHist.class);
		if (!itemToBeDeleted.isPresent()){
			throw new RuntimeException("Invalid BsymtAffiDepartmentHist");
		}
		this.commandProxy().remove(BsymtAffiDepartmentHist.class, histId);
		
	}
	
	private BsymtAffiDepartmentHist toEntity(String cid, String employeeId, DateHistoryItem item){
		return new BsymtAffiDepartmentHist(item.identifier(), employeeId,cid, item.start(), item.end());
	}
	/**
	 * Update entity from domain
	 * @param employeeID
	 * @param item
	 * @return
	 */
	private void updateEntity(DateHistoryItem item,BsymtAffiDepartmentHist entity){	
		entity.setStrDate(item.start());
		entity.setEndDate(item.end());
	}

	@Override
	public Optional<AffDepartmentHistory> getAffDeptHistByEmpHistStandDate(String employeeId, GeneralDate standardDate) {
		List<BsymtAffiDepartmentHist> listHist = this.queryProxy().query(SELECT_BY_EMPID_STANDARDDATE,BsymtAffiDepartmentHist.class)
				.setParameter("employeeId", employeeId)
				.setParameter("standardDate", standardDate).getList();
		if (!listHist.isEmpty()){
			return Optional.of(toAffDepartment(listHist));
		}
		return Optional.empty();
	}

	@Override
	public Optional<AffDepartmentHistory> getByHistId(String historyId) {
		List<BsymtAffiDepartmentHist> listHist = this.queryProxy().query(SELECT_BY_HISTID,BsymtAffiDepartmentHist.class)
				.setParameter("historyId", historyId).getList();
		if (!listHist.isEmpty()){
			return Optional.of(toAffDepartment(listHist));
		}
		return Optional.empty();
	}

	@Override
	public List<Object[]> getAffDeptHistByEmpIdAndBaseDate(List<String> sids, GeneralDate baseDate) {
		String SELECT_BY_SID_AND_BASEDATE = "SELECT e.sid, it.depId "
				+ " FROM BsymtAffiDepartmentHist e "
				+ " INNER JOIN BsymtAffiDepartmentHistItem it ON e.hisId = it.hisId "
				+ " WHERE e.sid IN :sids AND e.strDate <= :baseDate AND e.endDate >= :baseDate ";
		
		List<Object[]> listObj = queryProxy().query(SELECT_BY_SID_AND_BASEDATE, Object[].class)
				.setParameter("sids", sids)
		 .setParameter("baseDate", baseDate).getList();
		return listObj;
	}
}
