package nts.uk.ctx.sys.portal.dom.toppage;

import java.math.BigDecimal;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページ.トップページ（New）.トップページ
 * @author LienPTK
 *
 */
@Getter
public class Toppage extends AggregateRoot {
	/** コード */
	private TopPageCode topPageCode;
	/** レイアウトの表示種類 */
	private LayoutDisplayType layoutDisp;
	/** 会社ID */
	private String cid;
	/** 名称 */
	private TopPageName topPageName;

	public Toppage() {}

	public static Toppage createFromMemento(MementoGetter memento) {
		Toppage domain = new Toppage();
		domain.getMemento(memento);
		return domain;
	}

	public void getMemento(MementoGetter memento) {
		this.cid = memento.getCid();
		this.layoutDisp = LayoutDisplayType.valueOf(memento.getLayoutDisp().intValue());
		this.topPageCode = new TopPageCode(memento.getTopPageCode());
		this.topPageName = new TopPageName(memento.getTopPageName());
	}

	public void setMemento(MementoSetter memento) {
		memento.setCid(this.cid);
		memento.setLayoutDisp(BigDecimal.valueOf(this.layoutDisp.value));
		memento.setTopPageCode(this.topPageCode.v());
		memento.setTopPageName(this.topPageName.v());
	}

	public static interface MementoSetter {
		public void setTopPageCode(String toppageCode);
		public void setLayoutDisp(BigDecimal layoutDisp);
		public void setCid(String cid);
		public void setTopPageName(String topPageName);
	}


	public static interface MementoGetter {
		public String getTopPageCode();
		public BigDecimal getLayoutDisp();
		public String getCid();
		public String getTopPageName();
	}
}
