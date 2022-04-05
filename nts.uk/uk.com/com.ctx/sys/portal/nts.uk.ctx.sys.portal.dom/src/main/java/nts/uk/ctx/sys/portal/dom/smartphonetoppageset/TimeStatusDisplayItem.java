package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * 勤怠状況表示項目
 * 
 * @author sonnh1
 *
 */
@Getter
public class TimeStatusDisplayItem {
	/**
	 * 種類
	 */
	private TimeStatusType detailType;
	/**
	 * 表示区分
	 */
	private NotUseAtr displayAtr;


	public TimeStatusDisplayItem(TimeStatusType detailType, NotUseAtr displayAtr) {
		super();
		this.detailType = detailType;
		this.displayAtr = displayAtr;
	}

	public static TimeStatusDisplayItem createFromJavaType(int detailType, int displayAtr) {
		return new TimeStatusDisplayItem(EnumAdaptor.valueOf(detailType, TimeStatusType.class),
				EnumAdaptor.valueOf(displayAtr, NotUseAtr.class));
	}
}
