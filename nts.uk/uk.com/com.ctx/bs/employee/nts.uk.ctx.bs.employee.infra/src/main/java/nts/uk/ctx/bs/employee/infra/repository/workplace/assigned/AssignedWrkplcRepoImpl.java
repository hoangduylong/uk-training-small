/**
 * 
 */
package nts.uk.ctx.bs.employee.infra.repository.workplace.assigned;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.assigned.AssignedWorkplace;
import nts.uk.ctx.bs.employee.dom.workplace.assigned.AssignedWrkplcRepository;
import nts.uk.ctx.bs.employee.infra.entity.workplace.assigned.BsymtAssiWorkplace;
import nts.uk.ctx.bs.employee.infra.entity.workplace.assigned.BsymtAssiWorkplaceHist;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * @author danpv
 *
 */
@Stateless
public class AssignedWrkplcRepoImpl extends JpaRepository implements AssignedWrkplcRepository {

	private static final String SELECT_ASS_WORKPLACE_BY_ID = "SELECT a.assiWorkplaceId, a.empId, a.workplaceId, "
			+ " h.historyId, h.strD, h.endD FROM BsymtAssiWorkplaceHist h"
			+ " JOIN BsymtAssiWorkplace a ON a.histId = h.historyId"
			+ " WHERE a.bsymtAssiWorkplacePK.assiWorkplaceId = :assiWorkplaceId";

	private static final String SELECT_BY_EID = "select wp from BsymtAssiWorkplace wp" + "where wp.empId = :empId";

	private AssignedWorkplace toDomain(List<Object[]> lstEntity) {
		AssignedWorkplace assignedWorkplace = new AssignedWorkplace(String.valueOf(lstEntity.get(0)[1].toString()), String.valueOf(lstEntity.get(0)[0].toString()), 
				String.valueOf(lstEntity.get(0)[2].toString()), 
				lstEntity.stream().map(x -> new DateHistoryItem(x[3].toString(), new DatePeriod(GeneralDate.fromString(String.valueOf(x[4].toString()), "yyyy-MM-dd"), 
						GeneralDate.fromString(String.valueOf(x[5].toString()), "yyyy-MM-dd"))))
				.collect(Collectors.toList()));
		return assignedWorkplace;
	}
	
	
	private List<AssignedWorkplace> toListAssignedWorkplace(List<BsymtAssiWorkplace> listEntity) {
		List<AssignedWorkplace> lstAssignedWorkplace = new ArrayList<>();
		if (!listEntity.isEmpty()) {
			listEntity.stream().forEach(c -> {
				AssignedWorkplace assignedWorkplace = toDomainAssignedWorkplace(c);
				
				lstAssignedWorkplace.add(assignedWorkplace);
			});
		}
		return lstAssignedWorkplace;
	}
	
	private AssignedWorkplace toDomainAssignedWorkplace(BsymtAssiWorkplace entity) {
		val domain = AssignedWorkplace.creatFromJavaType(entity.empId,
				entity.assiWorkplaceId, entity.workplaceId);
		return domain;
	}

	// waiting QA
	@Override
	public Optional<AssignedWorkplace> getByEmpIdAndStandDate(String employeeId, GeneralDate standandDate) {
		/*List<BsymtAssiWorkplace> datas = this.queryProxy().query(SELECT_BY_EID, BsymtAssiWorkplace.class).getList();
		for ( BsymtAssiWorkplace ent : datas ) {
			for ( BsymtAssiWorkplaceHist hist : ent.lstBsymtAssiWorkplaceHist) {
				if ( hist.strD.beforeOrEquals(standandDate) && hist.endD.afterOrEquals(standandDate)) {
					return Optional.of(AssignedWorkplace.)
				}
			}
		}
		return Optional.empty();*/
		return null;
	}

	@Override
	public AssignedWorkplace getAssignedWorkplaceById(String assignedWorkplaceId) {
		List<Object[]> lstEntity = this.queryProxy().query(SELECT_ASS_WORKPLACE_BY_ID, Object[].class)
				.setParameter("assiWorkplaceId", assignedWorkplaceId).getList();
		return toDomain(lstEntity);
	}
	/**
	 * Update entity from domain
	 * @param domain
	 * @param entity
	 */
	private void updateEntity(AssignedWorkplace domain,BsymtAssiWorkplace entity){
		entity.empId = domain.getEmployeeId();
		entity.workplaceId = domain.getWorkplaceId();
	}
	
	/**
	 * Update history table from domain
	 * @param item
	 * @param entity
	 */
	private void updateEntityBsymtAssiWorkplaceHist(DateHistoryItem item,BsymtAssiWorkplaceHist entity){
		entity.strD = item.start();
		entity.endD = item.end();
	}
	
	@Override
	public void updateAssignedWorkplace(AssignedWorkplace domain) {
		Optional<BsymtAssiWorkplace> existItem = this.queryProxy().find(domain.getAssignedWorkplaceId(), BsymtAssiWorkplace.class);
		
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid Assign workplace");
		}
		
		// Update history
		for (DateHistoryItem item : domain.getDateHistoryItem()){
			Optional<BsymtAssiWorkplaceHist> existItemHist = this.queryProxy().find(item.identifier(), BsymtAssiWorkplaceHist.class);
			if (!existItemHist.isPresent()){
				throw new RuntimeException("invalid Assign workplace history");
			}
			updateEntityBsymtAssiWorkplaceHist(item,existItemHist.get());
			this.commandProxy().update(existItemHist.get());
		}
		
		// Update entity
		updateEntity(domain, existItem.get());
		
		this.commandProxy().update(existItem.get());
		
	}

	@Override
	public List<AssignedWorkplace> getListBySId(String sid) {
		List<BsymtAssiWorkplace> listEntity= this.queryProxy().query(SELECT_BY_EID, BsymtAssiWorkplace.class)
				.setParameter("empId", sid)
				.getList();

		return toListAssignedWorkplace(listEntity);
		
	}

}
