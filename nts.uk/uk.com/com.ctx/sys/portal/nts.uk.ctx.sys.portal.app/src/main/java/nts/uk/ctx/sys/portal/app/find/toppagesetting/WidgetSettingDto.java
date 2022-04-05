package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WidgetSettingDto {
	/** ウィジェット種類 */
	private Integer widgetType;
	/** 順番 */
	private int order;
	
}
