package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DisplayInTopPage {
	//	レイアウト枠1
	private List<FlowMenuOutputCCG008> layout1;
	//	レイアウト枠2
	private List<WidgetSettingDto> layout2;
	//	レイアウト枠3
	private List<WidgetSettingDto> layout3;
	
	private String urlLayout1;
	
	private Integer	layoutDisplayType;
}
