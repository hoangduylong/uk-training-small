/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.find.mypage.setting;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Data;
import nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSetting;

/**
 * The Class MyPageSettingDto.
 */
@Data
public class MyPageSettingDto {

	/** The My page setting code. */
	private String companyId;

	/** The use my page. */
	private Integer useMyPage;

	/** The use Standar widget. */
	private Integer useStandarWidget;
	
	/** The use Optional Widget. */
	private Integer useOptionalWidget;

	/** The use dashboard. */
	private Integer useDashboard;

	/** The use flow menu. */
	private Integer useFlowMenu;

	/** The external url permission. */
	private Integer externalUrlPermission;

	/** The top page part use setting dto. */
	private List<TopPagePartUseSettingDto> topPagePartUseSettingDto;

	/**
	 * From domain.
	 *
	 * @param myPageSetting the my page setting
	 * @return the my page setting dto
	 */
	public static MyPageSettingDto fromDomain(MyPageSetting myPageSetting) {
		MyPageSettingDto myPageSettingDto = new MyPageSettingDto();
		myPageSettingDto.useMyPage = myPageSetting.getUseMyPage().value;
		myPageSettingDto.useStandarWidget = myPageSetting.getUseStandarWidget().value;
		myPageSettingDto.useOptionalWidget = myPageSetting.getUseOptionalWidget().value;
		myPageSettingDto.useDashboard = myPageSetting.getUseDashboard().value;
		myPageSettingDto.useFlowMenu = myPageSetting.getUseFlowMenu().value;
		myPageSettingDto.externalUrlPermission = myPageSetting.getExternalUrlPermission().value;
		myPageSettingDto.topPagePartUseSettingDto = myPageSetting.getTopPagePartUseSetting().stream().map(item -> {
			return TopPagePartUseSettingDto.fromDomain(item);
		}).collect(Collectors.toList()) ;
		return myPageSettingDto;
	}
}
