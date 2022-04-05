package nts.uk.ctx.bs.employee.pubimp.workplace.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceConfigurationRepository;
import nts.uk.ctx.bs.employee.pub.workplace.config.WorkPlaceConfigExport;
import nts.uk.ctx.bs.employee.pub.workplace.config.WorkPlaceConfigPub;
import nts.uk.ctx.bs.employee.pub.workplace.config.WorkplaceConfigHistoryExport;

@Stateless
public class WorkplaceConfigPubImp implements WorkPlaceConfigPub {
	
	
	@Inject
	private WorkplaceConfigurationRepository configRepo;

	@Override
	public Optional<WorkPlaceConfigExport> findByBaseDate(String companyId, GeneralDate baseDate) {
		return this.configRepo.findByDate(companyId, baseDate).map(x -> {
			List<WorkplaceConfigHistoryExport> wkpConfigHistory = x.items().stream()
					.map(his -> new WorkplaceConfigHistoryExport(his.identifier(), his.span()))
					.collect(Collectors.toList());
			return new WorkPlaceConfigExport(x.getCompanyId(), wkpConfigHistory);
		});
	}

	@Override
	public List<WorkPlaceConfigExport> findByCompanyIdAndPeriod(String companyId, DatePeriod datePeriod) {
		return this.configRepo.findByCompanyIdAndPeriod(companyId, datePeriod).stream().filter(x -> x != null).map(x -> {
			List<WorkplaceConfigHistoryExport> wkpConfigHistory;
			if (CollectionUtil.isEmpty(x.items())) {
				wkpConfigHistory = new ArrayList<>();
			} else {
				wkpConfigHistory = x.items().stream()
						.map(his -> new WorkplaceConfigHistoryExport(his.identifier(), his.span()))
						.collect(Collectors.toList());
			}
			return new WorkPlaceConfigExport(x.getCompanyId(), wkpConfigHistory);
		}).collect(Collectors.toList());
	}

}
