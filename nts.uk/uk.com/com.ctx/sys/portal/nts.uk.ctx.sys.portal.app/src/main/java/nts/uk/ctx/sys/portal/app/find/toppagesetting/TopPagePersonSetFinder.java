package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSet;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSetRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * Find TopPagePersonSet in table TOPPAGE_PERSON_SET
 * 
 * @author sonnh1
 *
 */
@Stateless
public class TopPagePersonSetFinder {

	@Inject
	private TopPagePersonSetRepository topPagePersonSetRepo;

	public List<TopPagePersonSetDto> find(List<String> listSid) {
		String companyId = AppContexts.user().companyId();
		List<TopPagePersonSetDto> topPagePersonSetDto = new ArrayList<>();
		//check empty listSid 
		if (CollectionUtil.isEmpty(listSid)) {
			return Collections.emptyList();
		}
		// find TopPagePersonSet base on companyId and list Sid
		List<TopPagePersonSet> listTopPagePersonSet = topPagePersonSetRepo.findByListSid(companyId, listSid);
		if (listTopPagePersonSet.size() > 0) {
			topPagePersonSetDto = listTopPagePersonSet.stream().map(x -> {
				return new TopPagePersonSetDto(x.getEmployeeId(), x.getTopMenuCode().v(), x.getLoginMenuCode().v(),
						x.getLoginSystem().value, x.getMenuClassification().value);
			}).collect(Collectors.toList());
		}
		return topPagePersonSetDto;
	}
}
