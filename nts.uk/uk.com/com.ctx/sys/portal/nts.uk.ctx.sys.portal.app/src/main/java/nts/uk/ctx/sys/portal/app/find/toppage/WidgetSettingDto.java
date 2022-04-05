package nts.uk.ctx.sys.portal.app.find.toppage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WidgetSettingDto {
	
	private int widgetType;
	
	private int order;

}
