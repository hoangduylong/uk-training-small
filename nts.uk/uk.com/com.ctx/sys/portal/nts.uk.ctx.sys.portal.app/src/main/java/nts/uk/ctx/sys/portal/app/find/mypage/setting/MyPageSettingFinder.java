/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.find.mypage.setting;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSetting;
import nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSettingRepository;

/**
 * The Class MyPageSettingFinder.
 */
@Stateless
public class MyPageSettingFinder {

	/** The my page setting repository. */
	@Inject
	private MyPageSettingRepository myPageSettingRepository;

	/**
	 * Find by company id.
	 *
	 * @param CompanyId
	 *            the company id
	 * @return the my page setting dto
	 */
	public MyPageSettingDto findByCompanyId(String companyId) {
		Optional<MyPageSetting> myPageSetting = myPageSettingRepository.findByCompanyId(companyId);
		// convert toppage domain to dto
		if (myPageSetting.isPresent()) {
			MyPageSetting mps = myPageSetting.get();
			return MyPageSettingDto.fromDomain(mps);
		}
		return null;
	}
}
