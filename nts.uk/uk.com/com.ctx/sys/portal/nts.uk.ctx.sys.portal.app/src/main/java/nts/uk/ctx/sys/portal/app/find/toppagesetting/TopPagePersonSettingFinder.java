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

import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSettingRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class TopPagePersonSettingFinder {

	@Inject
	private TopPagePersonSettingRepository repo;
	
	/**
	 * Gets the all by employee ids.
	 * ドメインモデル「個人別トップページ設定」を取得する
	 * @param employeeIds the employee ids
	 * @return the all by employee ids
	 */
	public List<TopPagePersonSettingDto> getAllByEmployeeIds(List<String> employeeIds) {
		return this.repo.getByCompanyIdAndEmployeeIds(AppContexts.user().companyId(), employeeIds).stream()
				.map(TopPagePersonSettingDto::fromDomain)
				.sorted(Comparator.comparing(TopPagePersonSettingDto::getEmployeeId))
				.collect(Collectors.toList());
	}
	
	/**
	 * Gets the by company id and employee id.
	 *
	 * @param employeeId the employee id
	 * @return the by company id and employee id
	 */
	public Optional<TopPagePersonSettingDto> getByCompanyIdAndEmployeeId(String employeeId) {
		return this.repo.getByCompanyIdAndEmployeeId(AppContexts.user().companyId(), employeeId)
				.map(TopPagePersonSettingDto::fromDomain);
	}
	
	
	public List<TopPagePersonSettingDto> getAllByCid() {
		return this.repo.getByCompanyId(AppContexts.user().companyId()).stream()
				.map(TopPagePersonSettingDto::fromDomain)
				.sorted(Comparator.comparing(TopPagePersonSettingDto::getEmployeeId))
				.collect(Collectors.toList());
	}
}
