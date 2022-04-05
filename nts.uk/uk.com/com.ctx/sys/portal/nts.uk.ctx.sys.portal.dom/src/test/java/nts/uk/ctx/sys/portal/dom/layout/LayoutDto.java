package nts.uk.ctx.sys.portal.dom.layout;

import java.math.BigDecimal;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LayoutDto implements Layout.MementoSetter, Layout.MementoGetter{
	/** ウィジェット設定 */
	private List<WidgetSetting> widgetSettings;
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
	public void setLayoutNo(BigDecimal layoutNo) {
		this.layoutNo = layoutNo.intValue();
	}
	
	@Override
	public String getTopPageCode() {
		return this.topPageCode;
	}

	@Override
	public void setTopPageCode(String toppageCode) {
		this.topPageCode = toppageCode;
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
	public void setLayoutType(BigDecimal layoutType) {
		this.layoutType = layoutType.intValue();
	}

	@Override
	public String getCid() {
		return this.cid;
	}

	@Override
	public void setCid(String cid) {
		this.cid = cid;
	}

	@Override
	public String getFlowMenuCd() {
		return this.flowMenuCd;
	}
	
	@Override
	public void setFlowMenuCd(String flowMenuCd) {
		this.flowMenuCd = flowMenuCd;
	}

	@Override
	public String getFlowMenuUpCd() {
		return this.flowMenuUpCd;
	}

	@Override
	public void setFlowMenuUpCd(String flowMenuUpCd) {
		this.flowMenuUpCd = flowMenuUpCd;
	}

	@Override
	public String getUrl() {
		return this.url;
	}

	@Override
	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public void setWidgetSettings(List<WidgetSetting> widgetSettings) {
		this.widgetSettings = widgetSettings;
	}
}
