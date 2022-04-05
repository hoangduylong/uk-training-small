package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageJobSet;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageJobSetRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * Find TopPageSet in table TOPPAGE_SET
 * 
 * @author sonnh1
 *
 */
@Stateless
public class TopPageJobSetFinder {
	@Inject
	private TopPageJobSetRepository topPageJobSetRepo;

	public List<TopPageJobSetDto> find(List<String> listJobId) {
		String companyId = AppContexts.user().companyId();
		List<TopPageJobSetDto> topPageJobSetDto = new ArrayList<>();
		//check empty listJobId
		if (CollectionUtil.isEmpty(listJobId)) {
			return Collections.emptyList();
		}
		// find toppagejobset base on companyId and list jobId
		List<TopPageJobSet> listTopPageJobSet = topPageJobSetRepo.findByListJobId(companyId, listJobId);
		if (listTopPageJobSet.size() > 0) {
			topPageJobSetDto = listTopPageJobSet.stream().map(x -> {
				return new TopPageJobSetDto(x.getTopMenuCode().v(), x.getLoginMenuCode().v(), x.getJobId(),
						x.getPersonPermissionSet().value, x.getLoginSystem().value, x.getMenuClassification().value);
			}).collect(Collectors.toList());
		}
		return topPageJobSetDto;
	}
}
