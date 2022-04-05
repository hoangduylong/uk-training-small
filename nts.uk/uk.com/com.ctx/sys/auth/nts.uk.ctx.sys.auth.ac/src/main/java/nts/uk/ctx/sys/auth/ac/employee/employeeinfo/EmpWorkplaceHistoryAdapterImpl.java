package nts.uk.ctx.sys.auth.ac.employee.employeeinfo;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.workplace.SWkpHistExport;
import nts.uk.ctx.bs.employee.pub.workplace.master.WorkplacePub;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmpWorkplaceHistoryAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmpWorkplaceHistoryImport;

@Stateless
public class EmpWorkplaceHistoryAdapterImpl implements EmpWorkplaceHistoryAdapter {

//	@Inject
//	private SyWorkplacePub syWorkplacePub;
	
	@Inject
	private WorkplacePub workplacePub;
	
	private EmpWorkplaceHistoryImport toImport(SWkpHistExport ex){
		return new EmpWorkplaceHistoryImport ( 
				ex.getEmployeeId(),
				ex.getWorkplaceId(),
				ex.getWorkplaceCode(),
				ex.getWorkplaceName(),
				ex.getWkpDisplayName(),
				ex.getDateRange());
	}
		
	
	public Optional<EmpWorkplaceHistoryImport> findBySid(String employeeID, GeneralDate baseDate) {
		//Lay request 30 NEW
		return workplacePub.findBySid(employeeID, baseDate).map(c -> toImport(c));

	}


	@Override
	public List<String> getListWorkPlaceIDByDate(GeneralDate date) {
		 List<String> data = workplacePub.getListWorkplaceIdByBaseDate(date);
		return data;
	}
}
