package nts.uk.ctx.sys.portal.infra.entity.toppage;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Data;
import lombok.EqualsAndHashCode;
import nts.uk.ctx.sys.portal.dom.toppage.TopPageReloadSetting;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * UKDesign.詳細設計.ER図.システム.ポータル.トップページ.SPTMT_TOPPAGE_RELOAD
 * 
 * @author LienPTK
 */
@Data
@Entity
@Table(name = "SPTMT_TOPPAGE_RELOAD")
@EqualsAndHashCode(callSuper = true)
public class SptmtToppageReload extends UkJpaEntity
		implements Serializable, TopPageReloadSetting.MementoGetter, TopPageReloadSetting.MementoSetter {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "CID")
	private String cid;

	@Version
	@Column(name = "EXCLUS_VER")
	private int exclusVer;

	@Column(name = "CONTRACT_CD")
	private String contractCd;

	@Column(name = "RELOAD_INTERVAL")
	private BigDecimal reloadInterval;

	@Override
	protected Object getKey() {
		return this.cid;
	}
}
