package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;

import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * 通知表示項目
 * 
 * @author sonnh1
 *
 */
@Getter
public class NotificationDisplayItem {
	/**
	 * 種類
	 */
	private NotificationType detailType;
	/**
	 * 表示区分
	 */
	private NotUseAtr displayAtr;

	public NotificationDisplayItem(NotificationType detailType, NotUseAtr displayAtr) {
		super();
		this.detailType = detailType;
		this.displayAtr = displayAtr;
	}

	public static NotificationDisplayItem createFromJavaType(int detailType, int displayAtr) {
		return new NotificationDisplayItem(EnumAdaptor.valueOf(detailType, NotificationType.class),
				EnumAdaptor.valueOf(displayAtr, NotUseAtr.class));
	}
}
