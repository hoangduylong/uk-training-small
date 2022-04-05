/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.ws.mypage.setting;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.command.mypage.setting.UpdateMyPageSettingCommand;
import nts.uk.ctx.sys.portal.app.command.mypage.setting.UpdateMyPageSettingCommandHandler;
import nts.uk.ctx.sys.portal.app.find.mypage.setting.MyPageSettingDto;
import nts.uk.ctx.sys.portal.app.find.mypage.setting.MyPageSettingFinder;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class MyPageSetWebService.
 */
@Path("/mypage")
@Stateless
public class MyPageSetWebService extends WebService {

	private static final String defaultCompanyId = "000000000000-0000";
	
	/** The my page setting finder. */
	@Inject
	private MyPageSettingFinder myPageSettingFinder;

	/** The my page setting command handler. */
	@Inject
	private UpdateMyPageSettingCommandHandler myPageSettingCommandHandler;

	/**
	 * Gets the my page setting detail.
	 *
	 * @return the my page setting detail
	 */
	@POST
	@Path("getMyPageSetting")
	public MyPageSettingDto getMyPageSettingDetail() {
		String companyId = AppContexts.user().companyId();
		return myPageSettingFinder.findByCompanyId(companyId);
	}
	
	/**
	 * Gets the default my page setting detail.
	 *
	 * @return the default my page setting detail
	 */
	@POST
	@Path("getDefaultMyPageSetting")
	public MyPageSettingDto getDefaultMyPageSettingDetail() {
		return myPageSettingFinder.findByCompanyId(defaultCompanyId);
	}
	
	/**
	 * Update my page setting.
	 *
	 * @param command the command
	 */
	@POST
	@Path("updateMyPageSetting")
	public void updateMyPageSetting(UpdateMyPageSettingCommand command) {
		myPageSettingCommandHandler.handle(command);
	}
}
