/*
 * 
 */
package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageRoleSettingRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class TopPageRoleSettingFinder {

	@Inject
	private TopPageRoleSettingRepository repo;
	
	public List<TopPageRoleSettingDto> getAllByCompanyId() {
		return this.repo.getByCompanyId(AppContexts.user().companyId()).stream()
				.map(TopPageRoleSettingDto::fromDomain)
				.sorted(Comparator.comparing(TopPageRoleSettingDto::getRoleSetCode))
				.collect(Collectors.toList());
	}
	
	public Optional<TopPageRoleSettingDto> getByCompanyIdAndRoleSetCode(String roleSetCode) {
		return this.repo.getByCompanyIdAndRoleSetCode(AppContexts.user().companyId(), roleSetCode)
				.map(TopPageRoleSettingDto::fromDomain);
	}
	
}
