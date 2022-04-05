package nts.uk.ctx.sys.portal.infra.entity.layout;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Data;
import lombok.EqualsAndHashCode;
import nts.uk.ctx.sys.portal.dom.layout.Layout;
import nts.uk.ctx.sys.portal.dom.layout.WidgetSetting;
import nts.uk.ctx.sys.portal.dom.layout.WidgetType;
import nts.uk.ctx.sys.portal.infra.entity.layout.widget.SptmtLayoutWidget;
import nts.uk.ctx.sys.portal.infra.entity.layout.widget.SptmtLayoutWidgetPK;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * UKDesign.詳細設計.ER図.システム.ポータル.レイアウト.SPTMT_LAYOUT
 * 
 * @author LienPTK
 */
@Data
@Entity
@Table(name = "SPTMT_LAYOUT")
@EqualsAndHashCode(callSuper = true)
public class SptmtLayout extends ContractUkJpaEntity implements Serializable, Layout.MementoGetter, Layout.MementoSetter {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public SptmtLayoutPk id;

	@Version
	@Column(name = "EXCLUS_VER")
	private int exclusVer;

	@Column(name = "LAYOUT_TYPE")
	private BigDecimal layoutType;

	@Column(name = "FLOW_MENU_CD")
	private String flowMenuCd;

	@Column(name = "URL")
	private String url;

	@Column(name = "FLOW_MENU_UP_CD")
	private String flowMenuUpCd;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "layout", orphanRemoval = true, fetch = FetchType.LAZY)
	@JoinColumns({ @JoinColumn(name = "LAYOUT_NO", referencedColumnName = "LAYOUT_NO", insertable = false, updatable = false),
				   @JoinColumn(name = "TOP_PAGE_CD", referencedColumnName = "TOP_PAGE_CD", insertable = false, updatable = false),
				   @JoinColumn(name = "CID", referencedColumnName = "CID", insertable = false, updatable = false), })
	private List<SptmtLayoutWidget> widgetSettings;

	public SptmtLayout() {
		super();
		this.id = new SptmtLayoutPk();
	}

	@Override
	protected Object getKey() {
		return this.id;
	}

	@Override
	public void setWidgetSettings(List<WidgetSetting> widgetSettings) {
		this.widgetSettings = widgetSettings.stream().map(t -> {
			SptmtLayoutWidget result = new SptmtLayoutWidget();
			result.setWidgetDisp(t.getOrder());
			SptmtLayoutWidgetPK pk = new SptmtLayoutWidgetPK();
			pk.cid = this.id.cid;
			pk.layoutNo = this.id.layoutNo;
			pk.topPageCode = this.id.topPageCode;
			pk.widgetType = new BigDecimal(t.getWidgetType().value);
			result.setId(pk);
			return result;
		}).collect(Collectors.toList());
	}

	@Override
	public void setTopPageCode(String toppageCode) {
		if (this.id != null) {
			this.id.topPageCode = toppageCode; 
		}
	}

	@Override
	public void setLayoutNo(BigDecimal layoutNo) {
		if (this.id != null) {
			this.id.layoutNo = layoutNo; 
		}
	}

	@Override
	public void setCid(String cid) {
		if (this.id != null) {
			this.id.cid = cid; 
		}
	}

	@Override
	public List<WidgetSetting> getWidgetSettings() {
		return widgetSettings.stream().map(t -> {
			return new WidgetSetting(WidgetType.valueOf(t.getId().widgetType.intValue())
					, t.getWidgetDisp().intValue());
		}).collect(Collectors.toList());
	}

	@Override
	public String getTopPageCode() {
		return this.id.topPageCode;
	}

	@Override
	public BigDecimal getLayoutNo() {
		return this.id.layoutNo;
	}

	@Override
	public String getCid() {
		return this.id.cid;
	}
}
