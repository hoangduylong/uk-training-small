package nts.uk.ctx.sys.portal.dom.layout;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.toppage.TopPageCode;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.レイアウト.レイアウト（New）.レイアウト
 * @author LienPTK
 *
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Layout extends AggregateRoot {
	/** ウィジェット設定 */
	private List<WidgetSetting> widgetSettings;
	/** トップページコード */
	private TopPageCode topPageCode;
	/** レイアウトNO */
	private LayoutNO layoutNo;
	/** レイアウト種類 */
	private LayoutType layoutType;
	/** 会社ID */
	private String cid; 
	/** フローメニューコード */
	private Optional<FlowMenuCode> flowMenuCd;
	/** フローメニューコード（アップロード） */
	private Optional<FlowMenuUpCode> flowMenuUpCd;
	/** 外部URL */
	private Optional<String> url;

	public static Layout createFromMemento(MementoGetter memento) {
		Layout domain = new Layout();
		domain.getMemento(memento);
		return domain;
	}

	public void getMemento(MementoGetter memento) {
		this.cid = memento.getCid();
		this.topPageCode = new TopPageCode(memento.getTopPageCode());
		this.layoutNo = new LayoutNO(memento.getLayoutNo());
		this.layoutType = LayoutType.valueOf(memento.getLayoutType().intValue());
		this.cid = memento.getCid();
		this.flowMenuCd = Optional.ofNullable(new FlowMenuCode(memento.getFlowMenuCd()));
		this.flowMenuUpCd = Optional.ofNullable(new FlowMenuUpCode(memento.getFlowMenuUpCd()));
		this.url = Optional.ofNullable(memento.getUrl());
		this.widgetSettings = memento.getWidgetSettings();
	}

	public void setMemento(MementoSetter memento) {
		memento.setCid(this.cid);
		memento.setTopPageCode(this.topPageCode.v());
		memento.setLayoutNo(this.layoutNo.v());
		memento.setLayoutType(BigDecimal.valueOf(this.layoutType.value));
		memento.setFlowMenuCd(this.flowMenuCd.map(t -> t.v()).orElse(null));
		memento.setFlowMenuUpCd(this.flowMenuUpCd.map(t -> t.v()).orElse(null));
		memento.setUrl(this.url.orElse(null));
		memento.setWidgetSettings(this.widgetSettings);
	}

	public static interface MementoSetter {
		public void setWidgetSettings(List<WidgetSetting> widgetSettings);
		public void setTopPageCode(String toppageCode);
		public void setLayoutNo(BigDecimal layoutNo);
		public void setLayoutType(BigDecimal layoutType);
		public void setCid(String cid);
		public void setFlowMenuCd(String flowMenuCd);
		public void setFlowMenuUpCd(String flowMenuUpCd);
		public void setUrl(String url);
	}
	
	public static interface MementoGetter {
		public List<WidgetSetting> getWidgetSettings();
		public String getTopPageCode();
		public BigDecimal getLayoutNo();
		public BigDecimal getLayoutType();
		public String getCid();
		public String getFlowMenuCd();
		public String getFlowMenuUpCd();
		public String getUrl();
	}
	
	public void setTopPageCode(String toppageCode) {
		this.topPageCode = new TopPageCode(toppageCode);
	}
	
	public void setWidgetSetting(List<WidgetSetting> lstWidget) {
		this.widgetSettings = lstWidget;
	}
}
