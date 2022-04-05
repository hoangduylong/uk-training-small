package nts.uk.ctx.sys.portal.app.command.toppage;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.portal.app.find.toppage.WidgetSettingDto;
import nts.uk.ctx.sys.portal.dom.layout.Layout;
import nts.uk.ctx.sys.portal.dom.layout.WidgetSetting;
import nts.uk.ctx.sys.portal.dom.layout.WidgetType;

@Data
@NoArgsConstructor
public class SaveLayoutCommand implements Layout.MementoGetter {
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
	public List<WidgetSetting> getWidgetSettings() {
		if (this.widgetSettings == null) {
			return new ArrayList<WidgetSetting>();
		}
		return this.widgetSettings.stream()
				.map(x -> new WidgetSetting(WidgetType.valueOf(x.getWidgetType()), x.getOrder())).collect(Collectors.toList());
	}

	@Override
	public String getTopPageCode() {
		return this.topPageCode;
	}

	@Override
	public BigDecimal getLayoutNo() {
		return BigDecimal.valueOf(this.layoutNo);
	}

	@Override
	public BigDecimal getLayoutType() {
		return BigDecimal.valueOf(this.layoutType);
	}

	@Override
	public String getCid() {
		return this.cid;
	}


	@Override
	public String getFlowMenuCd() {
		return this.flowMenuCd;
	}


	@Override
	public String getFlowMenuUpCd() {
		return this.flowMenuUpCd;
	}

	@Override
	public String getUrl() {
		return this.url;
	}

}
