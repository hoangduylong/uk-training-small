/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.find.mypage.setting;

import lombok.Data;
import nts.uk.ctx.sys.portal.dom.mypage.setting.TopPagePartUseSetting;

/**
 * The Class TopPagePartUseSettingDto.
 */
@Data
public class TopPagePartUseSettingDto {

	/** The company id. */
	private String companyId;

	/** The top page part id. */
	private String topPagePartId;
	
	/** The part item code. */
	private String partItemCode;

	/** The part item name. */
	private String partItemName;

	/** The use division. */
	private Integer useDivision;

	/** The part type. */
	private Integer partType;

	/**
	 * From domain.
	 *
	 * @param topPagePartSettingItem the top page part setting item
	 * @return the top page part use setting dto
	 */
	public static TopPagePartUseSettingDto fromDomain(TopPagePartUseSetting topPagePartSettingItem) {
		TopPagePartUseSettingDto topPagePartSettingItemDto = new TopPagePartUseSettingDto();
		topPagePartSettingItemDto.topPagePartId = topPagePartSettingItem.getTopPagePartId();
		topPagePartSettingItemDto.partItemCode = topPagePartSettingItem.getTopPagePartCode().toString();
		topPagePartSettingItemDto.partItemName = topPagePartSettingItem.getTopPagePartName().toString();
		topPagePartSettingItemDto.useDivision = topPagePartSettingItem.getUseDivision().value;
		topPagePartSettingItemDto.partType = topPagePartSettingItem.getTopPagePartType().value;
		return topPagePartSettingItemDto;
	}
}
