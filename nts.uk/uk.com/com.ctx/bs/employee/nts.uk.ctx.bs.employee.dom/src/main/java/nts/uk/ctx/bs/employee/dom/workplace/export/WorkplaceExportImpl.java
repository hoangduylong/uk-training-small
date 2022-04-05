package nts.uk.ctx.bs.employee.dom.workplace.export;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.apache.commons.lang3.tuple.Pair;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.WorkplaceConfigInfo;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.WorkplaceHierarchy;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceConfiguration;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceConfigurationRepository;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformation;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformationRepository;

/**
 * 
 * @author sonnh1
 *
 */
@Stateless
public class WorkplaceExportImpl implements WorkplaceExport {

	@Inject
	private WorkplaceConfigurationRepository workplaceConfigRepository;

	@Inject
	private WorkplaceInformationRepository workplaceConfigInfoRepository;

	@Override
	public List<WkpInfoDto> getAllWkpConfig(String companyId, List<String> listWkpId, GeneralDate baseDate) {
		List<WkpInfoDto> results = new ArrayList<>();
		// ドメインモデル「職場構成」を取得する
		Optional<WorkplaceConfiguration> optWorkplaceConfig = this.workplaceConfigRepository.findByDate(companyId,
				baseDate);
		if (!optWorkplaceConfig.isPresent()) {
			return results;
		}
		// tai 1 ngay nhat dinh se chi lay duoc 1 histId
		String histId = optWorkplaceConfig.get().items().get(0).identifier();
		// get WorkplaceConfigInfo de lay ra hierarchyCd
		List<WorkplaceConfigInfo> lstWorkplaceConfigInfo = this.convertData(this.workplaceConfigInfoRepository
				.findByHistoryIdsAndWplIds(companyId, Arrays.asList(histId), listWkpId));

		List<WorkplaceHierarchy> lstWkpHierarchy = new ArrayList<>();
		lstWorkplaceConfigInfo.forEach(x -> lstWkpHierarchy.addAll(x.getLstWkpHierarchy()));

		if (listWkpId.size() != lstWkpHierarchy.size()) {
			// 情報が取得できていない職場が存在する場合 TH tồn tại workplace chưa get được thông tin
			// get wkpId chua lay dc configInfo
			List<String> lstWkpIdNoInfo = new ArrayList<>();
			listWkpId.forEach(wkpId -> {
				if (!lstWkpHierarchy.stream().filter(x -> x.getWorkplaceId().equals(wkpId)).findFirst().isPresent()) {
					lstWkpIdNoInfo.add(wkpId);
				}
			});
			// [No.561]過去の職場の情報を取得する
			List<WkpInfoDto> lstWkpInfoDto = this.getPastWkpInfo(companyId, lstWkpIdNoInfo, histId);
			results.addAll(lstWkpInfoDto);
		}

		lstWkpHierarchy.forEach(wkpInfo -> {
			results.add(new WkpInfoDto(wkpInfo.getWorkplaceId(), wkpInfo.getHierarchyCode().v()));
		});
		// 階層コード ASC
		List<WkpInfoDto> newResults = results.stream()
				.sorted(Comparator.comparing(WkpInfoDto::getHierarchyCd, Comparator.nullsLast(String::compareTo)))
				.collect(Collectors.toList());

		return newResults;
	}

	@Override
	public List<WkpInfoDto> getPastWkpInfo(String companyId, List<String> listWkpId, String histId) {
		List<WkpInfoDto> results = new ArrayList<>();
		List<WorkplaceHierarchy> lstWorkplaceHierarchyAll = new ArrayList<>();
		// ドメインモデル「職場構成」を取得する
		Optional<WorkplaceConfiguration> optWorkplaceConfig = this.workplaceConfigRepository.findByHistId(companyId, histId);
		if (!optWorkplaceConfig.isPresent()) {
			return results;
		}
		// EAP yeu cau loop theo tu tuong lai -> qua khu
		optWorkplaceConfig.get().items().sort((s1, s2) -> s1.span().isAfter(s2.span()) ? 1 : -1);
		List<String> listHistId = optWorkplaceConfig.get().items().stream().map(x -> x.identifier())
				.collect(Collectors.toList());

		for (String hId : listHistId) {
			// query WorkplaceConfigInfo de lay hierarchyCd
			List<WorkplaceConfigInfo> lstWorkplaceConfigInfo = this.convertData(this.workplaceConfigInfoRepository
					.findByHistoryIdsAndWplIds(companyId, Arrays.asList(hId), listWkpId));
			List<WorkplaceHierarchy> lstWkpHierarchy = new ArrayList<>();
			lstWorkplaceConfigInfo.forEach(x -> lstWkpHierarchy.addAll(x.getLstWkpHierarchy()));
			lstWorkplaceHierarchyAll.addAll(lstWkpHierarchy);
			// remove nhung wkpId da lay dc info
			lstWkpHierarchy.forEach(wkpHierarchy -> {
				listWkpId.remove(wkpHierarchy.getWorkplaceId());
			});
			if (listWkpId.size() == 0) {
				break; // すべて取得できた / Get được tất cả
			}
		}
		// convert to WkpInfoDto
		lstWorkplaceHierarchyAll.forEach(wkpHierarchy -> {
			results.add(new WkpInfoDto(wkpHierarchy.getWorkplaceId(), wkpHierarchy.getHierarchyCode().v()));
		});

		if (listWkpId.size() > 0) {
			listWkpId.forEach(wkpId -> {
				// 職場名称、職場表示名、職場総称には「マスタ未登録」を固定でセットする
				// この処理でも取得できなかった職場には「コード削除済」を固定でセットする
				results.add(new WkpInfoDto(wkpId, null));
			});
		}
		// 階層コード ASC
		List<WkpInfoDto> newResults = results.stream()
				.sorted(Comparator.comparing(WkpInfoDto::getHierarchyCd, Comparator.nullsLast(String::compareTo)))
				.collect(Collectors.toList());

		return newResults;
	}
	
	@Override
	public List<WkpDto> getWkpConfigRQ560(String companyId, List<String> listWkpId, GeneralDate baseDate) {
		List<WkpDto> results = new ArrayList<>();
		// ドメインモデル「職場構成」を取得する
		Optional<WorkplaceConfiguration> optWorkplaceConfig = this.workplaceConfigRepository.findByDate(companyId,
				baseDate);
		if (!optWorkplaceConfig.isPresent()) {
			return results;
		}
		List<WkpDto> lstWkpInfoDto = workplaceConfigInfoRepository.findByBaseDateWkpIds(companyId, listWkpId, baseDate).stream()
				.map(c -> new WkpDto(c.getWorkplaceId(), c.getWorkplaceName())).collect(Collectors.toList());
		results.addAll(lstWkpInfoDto);
		if (listWkpId.size() != lstWkpInfoDto.size()) {
			for(String id: listWkpId){
				if(!this.checkExist(lstWkpInfoDto, id)){
					results.add(new WkpDto(id, "コード削除済" ));
				}
			}
		}
		return results;
	}

	private boolean checkExist(List<WkpDto> lstWkpInfoDto, String id){
		for(WkpDto wp : lstWkpInfoDto){
			if(wp.getWorkplaceId().equals(id)) return true;
		}
		return false;
	}
	
	private List<WorkplaceConfigInfo> convertData(List<WorkplaceInformation> wp) {
		Map<Pair<String, String>, List<WorkplaceInformation>> map =
				wp.stream().collect(Collectors.groupingBy(p -> Pair.of(p.getCompanyId(), p.getWorkplaceHistoryId())));
		List<WorkplaceConfigInfo> returnList = new ArrayList<WorkplaceConfigInfo>();
		for (Pair<String, String> key : map.keySet()) {
			returnList.add(new WorkplaceConfigInfo(key.getLeft(), key.getRight(), 
					map.get(key).stream().map(x -> WorkplaceHierarchy.newInstance(x.getWorkplaceId(), x.getHierarchyCode().v())).collect(Collectors.toList())));
		}
		return returnList;
	}
}
