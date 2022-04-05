/**
 * 
 */
package nts.uk.ctx.bs.employee.app.find.workplace.personinfo;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.app.find.workplace.dto.WorkplaceInfoDto;
//import nts.uk.ctx.bs.employee.dom.workplace.Workplace;
//import nts.uk.ctx.bs.employee.dom.workplace.WorkplaceHistory;
//import nts.uk.ctx.bs.employee.dom.workplace.WorkplaceRepository;
//import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfo;
//import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoRepository;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceExportService;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceInforParam;
import nts.uk.shr.com.context.AppContexts;

/**
 * @author hieult
 *
 */
@Stateless
public class DisplayWorkplaceFinder {

//	@Inject
//	private WorkplaceRepository workplaceRepository;
//	
//	@Inject
//	private WorkplaceInfoRepository workplaceInfoRepository;
	
	@Inject
	private WorkplaceExportService workplaceService;
	
	public List<WorkplaceInfoDto> getData(GeneralDate baseDate , List<String> listWorkPlaceID){
		String companyId = AppContexts.user().companyId();
		if (baseDate == null || listWorkPlaceID.isEmpty()) {
			return new ArrayList<>();
		}
		
		// アルゴリズム「職場IDから職場を取得する」を実行する
		// (Thực hiện thuật toán [Lấy WorkPlace từ workplaceID])
		// ドメインモデル「職場」を取得する
//		List<String> histIds = new ArrayList<>();
//		List<Workplace> listWorkPlace = workplaceRepository.findWorkplaces(companyId, listWorkPlaceID, baseDate);
		
//		List<String> wkpIds = listWorkPlace.stream().map(c -> c.getWorkplaceId()).collect(Collectors.toList());
//		List<List<WorkplaceHistory>> listWorkplaceHistory = listWorkPlace.stream().map(c -> c.getWorkplaceHistory())
//				.collect(Collectors.toList());
//		for (List<WorkplaceHistory> list : listWorkplaceHistory) {
//			for (WorkplaceHistory workplaceHistory : list) {
//				String histID = workplaceHistory.identifier();
//				histIds.add(histID);
//			}
//		}
		
//		List<WorkplaceInfo> listWorkplaceInfo = workplaceInfoRepository.findByWkpIdsAndHistIds(companyId, wkpIds,
//				histIds);
		
		//表示名を返す
		
		//[No.560]職場IDから職場の情報をすべて取得する
		List<WorkplaceInforParam> listWorkplaceInfo = workplaceService.getWorkplaceInforFromWkpIds(companyId, listWorkPlaceID, baseDate);
		List<WorkplaceInfoDto> result = new ArrayList<>();
		if (listWorkplaceInfo.isEmpty()) {
			WorkplaceInfoDto c = new WorkplaceInfoDto(null, null, "#CPS001_107");
			result.add(c);
			return result;
		}
		
		//表示名を返す

		for (WorkplaceInforParam workplaceInfo : listWorkplaceInfo) {
			WorkplaceInfoDto a = new WorkplaceInfoDto(workplaceInfo.getWorkplaceId(),
					workplaceInfo.getWorkplaceCode(), workplaceInfo.getDisplayName());
			result.add(a);
		}
		return result;

	}
}