/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.mypage.setting;

import java.util.Optional;

/**
 * The Interface MyPageSettingRepository.
 */
public interface MyPageSettingRepository {
	
	/**
	 * Find by company id.
	 *
	 * @param CompanyId the company id
	 * @return the optional
	 */
	Optional<MyPageSetting> findByCompanyId(String CompanyId);
	
	/**
	 * Update.
	 *
	 * @param myPageSetting the my page setting
	 */
	void update(MyPageSetting myPageSetting);
	
	/**
	 * hoatt
	 * find my page setting
	 * @param companyId
	 * @return
	 */
	Optional<MyPageSetting> findMyPageSet(String companyId);
	
}
