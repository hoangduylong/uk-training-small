package nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.arc.error.BusinessException;
import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.workplace.EmployeeAffiliation;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItem;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupGettingService;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupRespository;
import nts.uk.shr.com.context.AppContexts;


/**
 * <<Query>> 社員の所属職場グループを取得する
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.App.社員の所属職場グループを取得する
 * @author quytb
 *
 */
@Stateless
public class AffWorkplaceGroupEmployeeQuery {

	@Inject
	private WorkplaceGroupRespository workplaceGroupRespository;

	@Inject
	private AffWorkplaceHistoryItemRepository affWkpHistoryItemRepo;

	/** 職場グループ所属情報Repository **/
	@Inject
	private AffWorkplaceGroupRespository repoAffWorkplaceGroup;

	/** 社員の所属職場グループを取得する */
	public AffWorkplaceGroupDto getWorkplaceGroupOfEmployee(GeneralDate date){
		String employeeId = AppContexts.user().employeeId();
		List<String> employeeIds = new ArrayList<String>();
		employeeIds.add(employeeId);

		/** 1: 取得する(年月日, 社員ID): 社員の所属組織**/
		WorkplaceGroupGettingImpl require = new WorkplaceGroupGettingImpl(affWkpHistoryItemRepo, repoAffWorkplaceGroup);
		List<EmployeeAffiliation> employeeAffiliations = WorkplaceGroupGettingService.get(require, date, employeeIds);

		if (!CollectionUtil.isEmpty(employeeAffiliations)
				&& employeeAffiliations.get(0).getWorkplaceGroupID().isPresent()) {
			String WKPGRPID = employeeAffiliations.get(0).getWorkplaceGroupID().get();
			String companyId = AppContexts.user().companyId();

			/** 3:get(ログイン会社ID, 社員の所属組織.職場グループID): Optional<職場グループ> **/
			Optional<WorkplaceGroup> workplaceGroupOptional = workplaceGroupRespository.getById(companyId, WKPGRPID);
			if(workplaceGroupOptional.isPresent()) {
				return new AffWorkplaceGroupDto(workplaceGroupOptional.get().getName().v(), workplaceGroupOptional.get().getId());
			} else {
				/** 2: 社員の所属組織.isEmpty**/
				throw new BusinessException("Msg_1867");
			}
		} else {
			/** 2: 社員の所属組織.isEmpty**/
			throw new BusinessException("Msg_1867");
		}
	}

	@AllArgsConstructor
	private static class WorkplaceGroupGettingImpl implements WorkplaceGroupGettingService.Require{
		@Inject
		private AffWorkplaceHistoryItemRepository affWkpHistoryItemRepo;

		/** 職場グループ所属情報Repository **/
		@Inject
		private AffWorkplaceGroupRespository repoAffWorkplaceGroup;

		@Override
		public String getAffWkpHistItemByEmpDate(String employeeID, GeneralDate date) {
			List<AffWorkplaceHistoryItem> itemLst = affWkpHistoryItemRepo.getAffWrkplaHistItemByEmpIdAndDate(date, employeeID);
			if(CollectionUtil.isEmpty(itemLst)) {
				return new String();
			} else {
				return itemLst.get(0).getWorkplaceId();
			}
		}

		@Override
		public List<AffWorkplaceGroup> getWGInfo(List<String> WKPID) {
			String companyId = AppContexts.user().companyId();
			List<AffWorkplaceGroup> affWorkplaceGroups = repoAffWorkplaceGroup.getByListWKPID(companyId, WKPID);
			return affWorkplaceGroups;
		}
	}
}

