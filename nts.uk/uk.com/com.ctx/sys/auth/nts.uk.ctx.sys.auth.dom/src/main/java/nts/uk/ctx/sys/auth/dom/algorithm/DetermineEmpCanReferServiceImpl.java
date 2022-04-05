package nts.uk.ctx.sys.auth.dom.algorithm;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkPlaceManageService;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmpWorkplaceHistoryAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmpWorkplaceHistoryImport;
import nts.uk.ctx.sys.auth.dom.adapter.workplace.SysAuthWorkplaceAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.workplace.WorkplaceInfoImport;
import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class DetermineEmpCanReferServiceImpl implements DetermineEmpCanReferService {

	@Inject
	private EmpReferenceRangeService empReferenceRangeService;

	@Inject
	private WorkPlaceManageService workPlaceManageService;

	@Inject
	private EmpWorkplaceHistoryAdapter empWorkplaceHistoryAdapter;

	@Override
	public boolean checkDetermineEmpCanRefer(GeneralDate date, String employeeID, int roleType) {
		int referenceRange = 0;
		// アルゴリズム「社員参照範囲を取得する」を実行する
		Optional<Role> role = empReferenceRangeService.getByUserIDAndReferenceDate(AppContexts.user().userId(), roleType, GeneralDate.today());
		if (role.isPresent()) {
			// 参照可能な職場リストを取得する
			referenceRange = role.get().getEmployeeReferenceRange().value;
			List<String> workplaceID1 = workPlaceManageService.findListWorkplaceId(GeneralDate.today(), referenceRange);
	
			// imported（権限管理）「所属職場履歴」を取得する - RequestList30
			Optional<EmpWorkplaceHistoryImport> empWorkplaceHistory = empWorkplaceHistoryAdapter.findBySid(employeeID, date);
			if (empWorkplaceHistory.isPresent()) {
				String workplaceID2 = empWorkplaceHistory.get().getWorkplaceID();
				if (workplaceID1.contains(workplaceID2) == true) {
					return true;
				} else {
					return false;
				}
			}
		}
		return false;

	}

}
