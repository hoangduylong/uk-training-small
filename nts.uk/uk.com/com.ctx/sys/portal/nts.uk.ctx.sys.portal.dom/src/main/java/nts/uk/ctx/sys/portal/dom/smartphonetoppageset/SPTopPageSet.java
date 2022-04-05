package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * スマホのトップページ設定
 * 
 * @author sonnh1
 *
 */
@Getter
public class SPTopPageSet extends AggregateRoot {
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * スマホトップページ種別
	 */
	private SPTopPageType smartPhoneTopPageType;
	/**
	 * 表示区分
	 */
	private NotUseAtr displayAtr;

	public SPTopPageSet(String companyId, SPTopPageType smartPhoneTopPageType, NotUseAtr displayAtr) {
		super();
		this.companyId = companyId;
		this.smartPhoneTopPageType = smartPhoneTopPageType;
		this.displayAtr = displayAtr;
	}

	public static SPTopPageSet createFromJavaType(String companyId, SPTopPageType smartPhoneTopPageType,
			int displayAtr) {
		return new SPTopPageSet(companyId, smartPhoneTopPageType,
				EnumAdaptor.valueOf(displayAtr, NotUseAtr.class));
	}
}
