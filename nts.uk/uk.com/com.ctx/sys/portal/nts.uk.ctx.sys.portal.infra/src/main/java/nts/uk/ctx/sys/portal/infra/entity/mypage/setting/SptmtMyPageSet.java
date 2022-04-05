/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.infra.entity.mypage.setting;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "SPTMT_MY_PAGE_SET")
public class SptmtMyPageSet extends ContractUkJpaEntity {

	@Id
	@Column(name = "CID")
	public String cid;

	/** The use my page atr. */
	@Column(name = "USE_MY_PAGE_ATR")
	public int useMyPageAtr;

	/** The use widget atr. */
	@Column(name = "USE_STANDAR_WIDGET_ATR")
	public int useStandarWidgetAtr;
	
	/** The use widget atr. */
	@Column(name = "USE_OPTIONAL_WIDGET_ATR")
	public int useOptionalWidgetAtr;

	/** The use dash board atr. */
	@Column(name = "USE_DASH_BOARD_ATR")
	public int useDashBoardAtr;

	/** The use folow menu atr. */
	@Column(name = "USE_FLOW_MENU_ATR")
	public int useFolowMenuAtr;

	/** The external url permission atr. */
	@Column(name = "EXTERNAL_URL_PERMISSION_ATR")
	public int externalUrlPermissionAtr;

	@Override
	protected Object getKey() {
		return cid;
	}

}
