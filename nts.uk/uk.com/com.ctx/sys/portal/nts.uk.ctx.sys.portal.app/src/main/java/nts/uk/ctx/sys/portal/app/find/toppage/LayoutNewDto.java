package nts.uk.ctx.sys.portal.app.find.toppage;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.portal.dom.layout.Layout;
import nts.uk.ctx.sys.portal.dom.layout.WidgetSetting;

@Getter
@Setter
public class LayoutNewDto implements Layout.MementoSetter {
	
	/** ウィジェット設定 */
	private List<WidgetSettingDto> widgetSettings;
	/** トップページコード */
	private String topPageCode;
	/** レイアウトNO */
	private int layoutNo;
	/** レイアウト種類 */
	private int layoutType;
	/** 会社ID */
	private String cid;
	/** フローメニューコード */
	private String flowMenuCd;
	/** フローメニューコード（アップロード） */
	private String flowMenuUpCd;
	/** 外部URL */
	private String url;

	@Override
	public void setWidgetSettings(List<WidgetSetting> widgetSettings) {
		if (widgetSettings == null) {
			return;
		}
		this.widgetSettings = widgetSettings.stream().map(x -> WidgetSettingDto.builder()
				.widgetType(x.getWidgetType().value)
				.order(x.getOrder())
				.build())
				.collect(Collectors.toList());
	}

	@Override
	public void setLayoutNo(BigDecimal layoutNo) {
		this.layoutNo = layoutNo.intValue();
	}
	
	@Override
	public void setLayoutType(BigDecimal layoutType) {
		this.layoutType = layoutType.intValue();
	}
}
