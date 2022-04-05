/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.mypage.setting;

import java.util.Set;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.portal.app.find.mypage.setting.TopPagePartUseSettingDto;
import nts.uk.ctx.sys.portal.dom.enums.PermissionDivision;
import nts.uk.ctx.sys.portal.dom.enums.UseDivision;
import nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSetting;
import nts.uk.ctx.sys.portal.dom.mypage.setting.TopPagePartUseSetting;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class MyPageSettingBaseCommand.
 */
@Getter
@Setter
public class MyPageSettingBaseCommand {
	/** The My page setting code. */
	private String companyId;

	/** The use my page. */
	private Integer useMyPage;

	/** The use Standard widget. */
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
	private Set<TopPagePartUseSettingDto> topPagePartUseSettingDto;

	/**
	 * To domain.
	 *
	 * @return the my page setting
	 */
	public MyPageSetting toDomain() {
		String companyId = AppContexts.user().companyId();
		return new MyPageSetting(companyId, UseDivision.valueOf(useMyPage), UseDivision.valueOf(useStandarWidget), 
				UseDivision.valueOf(useOptionalWidget), UseDivision.valueOf(useDashboard), UseDivision.valueOf(useFlowMenu),
				PermissionDivision.valueOf(externalUrlPermission), this.topPagePartUseSettingDto.stream().map(item -> {
					return TopPagePartUseSetting.createFromJavaType(companyId,item.getTopPagePartId(),item.getPartItemCode(),
							item.getPartItemName(), item.getUseDivision(), item.getPartType());
				}).collect(Collectors.toList()));
	}
}
