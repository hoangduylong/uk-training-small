package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.uk.ctx.sys.portal.dom.adapter.toppagesetting.LoginRoleSetCodeAdapter;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSetting;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSettingRepository;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageRoleSetting;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageRoleSettingRepository;
import nts.uk.ctx.sys.portal.dom.toppagesetting.service.TopPageSettingService;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * @author sonnh1
 *
 */
@Stateless
public class TopPageSettingFinder {

	@Inject
	private TopPagePersonSettingRepository topPagePersonSettingRepo;
	
	@Inject
	private TopPageRoleSettingRepository topPageRoleSettingRepo;
	
	@Inject
	private LoginRoleSetCodeAdapter adapter;

	@Inject
	private TopPageSettingService domainService;

	/**
	 * find topPageSetting Object base on companyId
	 * 
	 * @return topPageSettingDto
	 */
	public TopPageSettingDto findByCId() {
		TopPageSettingRequireImpl require = new TopPageSettingRequireImpl(
				this.topPagePersonSettingRepo,
				this.topPageRoleSettingRepo,
				this.adapter);
		Optional<TopPageSettingDto> topPageSettingDto = this.domainService.getTopPageSettings(
				require,
				AppContexts.user().companyId(), 
				AppContexts.user().employeeId()).map(TopPageSettingDto::fromDomain);
		return topPageSettingDto.orElse(null);
	}
	
	@AllArgsConstructor
	public static class TopPageSettingRequireImpl implements TopPageSettingService.Require {

		@Inject
		private TopPagePersonSettingRepository topPagePersonSettingRepo;
		
		@Inject
		private TopPageRoleSettingRepository topPageRoleSettingRepo;
		
		@Inject
		private LoginRoleSetCodeAdapter adapter;
		
		@Override
		public Optional<TopPagePersonSetting> getTopPagePersonSetting(String companyId, String employeeId) {
			return this.topPagePersonSettingRepo.getByCompanyIdAndEmployeeId(companyId, employeeId);
		}

		@Override
		public Optional<String> getRoleSetCode() {
			if (this.adapter.getLoginRoleSet().isPresent()) {
				return Optional.of(this.adapter.getLoginRoleSet().get().getRoleSetCd());
			}
			return Optional.empty();
		}

		@Override
		public Optional<TopPageRoleSetting> getTopPageRoleSetting(String companyId, String roleSetCode) {
			return this.topPageRoleSettingRepo.getByCompanyIdAndRoleSetCode(companyId, roleSetCode);
		}
		
	}
}
