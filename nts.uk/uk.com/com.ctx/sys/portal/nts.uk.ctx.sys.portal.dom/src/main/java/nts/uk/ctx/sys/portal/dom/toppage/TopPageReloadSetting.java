package nts.uk.ctx.sys.portal.dom.toppage;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページ.トップページ（New）.トップページのリロード設定
 * 
 * @author LienPTK
 *
 */
@Getter
@NoArgsConstructor
public class TopPageReloadSetting extends AggregateRoot {

	/** 会社ID */
	private String cid;

	/** リロード間隔 */
	private ReloadPeriodEnum reloadInterval;

	public static TopPageReloadSetting createFromMemento(MementoGetter memento) {
		TopPageReloadSetting domain = new TopPageReloadSetting();
		domain.getMemento(memento);
		return domain;
	}

	public void getMemento(MementoGetter memento) {
		this.cid = memento.getCid();
		if(memento.getReloadInterval() != null) {
			this.reloadInterval = ReloadPeriodEnum.valueOf(memento.getReloadInterval().intValue());
		}
	}

	public void setMemento(MementoSetter memento) {
		memento.setCid(this.cid);
		if (this.reloadInterval != null) {
			memento.setReloadInterval(BigDecimal.valueOf(this.reloadInterval.value));
		}
	}

	public static interface MementoSetter {
		public void setCid(String cid);
		public void setReloadInterval(BigDecimal reloadInterval);
	}


	public static interface MementoGetter {
		public String getCid();
		public BigDecimal getReloadInterval();
	}
	
	public static TopPageReloadSetting toDomain(String cId, Integer reloadInteval) {
		TopPageReloadSetting domain = new TopPageReloadSetting();
		domain.cid = cId;
		domain.reloadInterval =  ReloadPeriodEnum.valueOf(reloadInteval);
		return domain;
	}
}
