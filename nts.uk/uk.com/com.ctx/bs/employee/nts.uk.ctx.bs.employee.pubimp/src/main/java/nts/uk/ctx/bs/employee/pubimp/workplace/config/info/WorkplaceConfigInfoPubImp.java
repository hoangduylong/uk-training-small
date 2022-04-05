package nts.uk.ctx.bs.employee.pubimp.workplace.config.info;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.apache.commons.lang3.tuple.Pair;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.jobtitle.JobTitleRepository;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformation;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformationRepository;
import nts.uk.ctx.bs.employee.pub.workplace.config.info.JobTitleExport;
import nts.uk.ctx.bs.employee.pub.workplace.config.info.JobTitleHistoryExport;
import nts.uk.ctx.bs.employee.pub.workplace.config.info.WorkPlaceConfigInfoExport;
import nts.uk.ctx.bs.employee.pub.workplace.config.info.WorkPlaceConfigInfoPub;
import nts.uk.ctx.bs.employee.pub.workplace.config.info.WorkplaceHierarchyExport;

@Stateless
public class WorkplaceConfigInfoPubImp implements WorkPlaceConfigInfoPub {

	@Inject
	private WorkplaceInformationRepository workplaceInformationRepository;

	@Inject
	private JobTitleRepository repo;

	@Override
	public List<WorkPlaceConfigInfoExport> findByHistoryIdsAndWplIds(String companyId, List<String> historyIds,
			List<String> workplaceIds) {
		Map<Pair<String, String>, List<WorkplaceInformation>> map =
				this.workplaceInformationRepository.findByHistoryIdsAndWplIds(companyId, historyIds, workplaceIds).stream().collect(Collectors.groupingBy(p -> Pair.of(p.getCompanyId(), p.getWorkplaceHistoryId())));
		List<WorkPlaceConfigInfoExport> returnList = new ArrayList<WorkPlaceConfigInfoExport>();
		for (Pair<String, String> key : map.keySet()) {
			returnList.add(new WorkPlaceConfigInfoExport(key.getLeft(), key.getRight(), 
					map.get(key).stream().map(x -> new WorkplaceHierarchyExport(x.getWorkplaceId(), x.getHierarchyCode().v())).collect(Collectors.toList())));
		}
		return returnList;
	}

	@Override
	public List<JobTitleExport> findAllById(String companyId, List<String> positionIds, GeneralDate baseDate) {
		return this.repo.findAllById(companyId, positionIds, baseDate).stream().map(x -> {
			List<JobTitleHistoryExport> jobTitleHistories = x.getJobTitleHistories().stream()
					.map(item -> new JobTitleHistoryExport(item.identifier(), item.span()))
					.collect(Collectors.toList());
			return new JobTitleExport(x.getCompanyId().toString(), x.getJobTitleId(), jobTitleHistories);
		}).collect(Collectors.toList());
	}

}
