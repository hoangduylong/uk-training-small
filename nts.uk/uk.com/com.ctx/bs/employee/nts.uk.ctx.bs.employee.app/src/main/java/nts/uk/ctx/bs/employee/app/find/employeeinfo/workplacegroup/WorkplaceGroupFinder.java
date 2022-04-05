package nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceExportService;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceInforParam;
import nts.uk.shr.com.context.AppContexts;

/**
 * @author anhdt
 * 
 */
@Stateless
public class WorkplaceGroupFinder {
	
	@Inject
	private WorkplaceGroupRespository wkpGroupRepo;
	
	@Inject
	private AffWorkplaceGroupRespository affWpGroupRepo;
	
	@Inject
	private WorkplaceExportService wkpExportService;
	
	/**
	 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.App
	 * <<Query>> 職場グループをすべて取得する
	 * 部品起動
	 * @return List<職場グループ>
	 */
	public WorkplaceGroupDto getWorkplaceGroup () {
		String cid = AppContexts.user().companyId();
		List<WorkplaceGroup> wkpGroups = wkpGroupRepo.getAll(cid);
		return new WorkplaceGroupDto(wkpGroups);
	}
	
	/**
	 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.App
	 * <<Query>> 職場グループに所属する職場を取得する
	 * @return
	 */
	public List<String> getLstWorkplaceId (String WKPGRPID) {
		String cid = AppContexts.user().companyId();
		List<String> lstId = affWpGroupRepo.getWKPID(cid, WKPGRPID);
		return lstId;
	}
	
	
	/**
	 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.App
	 * 職場グループIDから職場グループを取得する
	 * @param WKPGRPID
	 * @return
	 */
	public WorkplaceGroupDto getWkplaceGroup (String WKPGRPID) {
		String cid = AppContexts.user().companyId();
		Optional<WorkplaceGroup> optional = wkpGroupRepo.getById(cid, WKPGRPID);
		if(!optional.isPresent())
			return null;
		return new WorkplaceGroupDto(optional.get());
	}
	
	public List<WorkplaceInforParam> getWorkplaceInfo(List<String> workplaceIds, GeneralDate baseDate) {
		return wkpExportService.getWorkplaceInforFromWkpIds(AppContexts.user().companyId(), workplaceIds, baseDate);
	}	
	
	public Map<String, WorkplaceGroupInforDto> getWorkplaceGroupKDL046(List<String> workplaceIds){
		String cid = AppContexts.user().companyId();
		Map<String, WorkplaceGroupInforDto> result = new HashMap<>();
		workplaceIds.forEach(wkpId -> {
			affWpGroupRepo.getWorkplaceGroup(cid, wkpId).ifPresent(wkpGroup -> {
				result.put(wkpId, new WorkplaceGroupInforDto(
						wkpGroup.getId()	,
						wkpGroup.getCode().v(),
						wkpGroup.getName().v(),
						true
				));
			});
		});
		return result;
	}
}
