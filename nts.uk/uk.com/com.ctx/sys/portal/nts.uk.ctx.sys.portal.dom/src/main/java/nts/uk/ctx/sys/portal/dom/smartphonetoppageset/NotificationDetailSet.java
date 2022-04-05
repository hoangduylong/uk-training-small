package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;

import java.util.List;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * 通知詳細設定
 * 
 * @author sonnh1
 *
 */
@Getter
public class NotificationDetailSet extends AggregateRoot {
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * 詳細項目
	 */
	private List<NotificationDisplayItem> detailedItem;
	public NotificationDetailSet(String companyId, List<NotificationDisplayItem> detailedItem) {
		super();
		this.companyId = companyId;
		this.detailedItem = detailedItem;
	}

	public static NotificationDetailSet createFromJavaType(String companyId,
			List<NotificationDisplayItem> detailedItem) {
		return new NotificationDetailSet(companyId, detailedItem);
	}
}
