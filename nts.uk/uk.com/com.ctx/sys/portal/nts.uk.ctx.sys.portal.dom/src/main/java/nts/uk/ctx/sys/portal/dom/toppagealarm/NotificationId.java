package nts.uk.ctx.sys.portal.dom.toppagealarm;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページアラーム（ver4～）.トップページアラーム
 */
@StringMaxLength(36)
public class NotificationId extends StringPrimitiveValue<NotificationId> {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public NotificationId(String rawValue) {
		super(rawValue);
	}
}
