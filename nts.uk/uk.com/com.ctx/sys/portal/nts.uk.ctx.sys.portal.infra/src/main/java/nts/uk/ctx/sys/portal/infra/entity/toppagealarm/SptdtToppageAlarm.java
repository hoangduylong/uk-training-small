package nts.uk.ctx.sys.portal.infra.entity.toppagealarm;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import nts.arc.enums.EnumAdaptor;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmListPatternCode;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayAtr;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayMessage;
import nts.uk.ctx.sys.portal.dom.toppagealarm.LinkURL;
import nts.uk.ctx.sys.portal.dom.toppagealarm.NotificationId;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * トップページアラームデータ Entity
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "SPTDT_TOPPAGE_ALARM")
public class SptdtToppageAlarm extends UkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Version
	@Column(name = "EXCLUS_VER")
	private long version;
	
	// column 契約コード
	@Basic(optional = false)
	@Column(name = "CONTRACT_CD")
	private String contractCd;
	
	@EmbeddedId
	private SptdtToppageAlarmPK pk;
	
	/**
	 * パターンコード
	 */
	@Column(name = "ALARM_PATTERN_CD")
	private String patternCode;
	
	/**
	 * 通知ID
	 */
	@Column(name = "NOTICE_ID")
	private String notificationId;
	
	/**
	 * 発生日時
	 */
	@Basic(optional = false)
	@Column(name = "CRT_DATETIME")
	private GeneralDateTime crtDatetime;
	
	/**
	 * 表示メッセージ
	 */
	@Basic(optional = false)
	@Column(name = "MESSEGE")
	private String messege;
	
	/**
	 * リンクURL
	 */
	@Column(name = "LINK_URL")
	private String linkUrl;
	
	/**
	 * 既読日時
	 */
	@Column(name = "ALREADY_DATETIME")
	private GeneralDateTime readDateTime;
	
	/**
	 * 解消済である
	 */
	@Basic(optional = false)
	@Column(name = "CANCEL_ATR")
	private Integer resolved;
	
	@OneToMany(cascade = CascadeType.ALL,targetEntity = SptdtTopAlarmSubSya.class, mappedBy = "sptdtToppageAlarm", orphanRemoval = true, fetch = FetchType.LAZY)
	@JoinTable(name = "SPTDT_TOP_ALARM_SUB_SYA")
	private List<SptdtTopAlarmSubSya> subSids;
	
	@Override
	protected Object getKey() {
		return this.pk;
	}
	
	public ToppageAlarmData toDomain() {
		return ToppageAlarmData.builder()
				.cid(this.pk.getCId())
				.alarmClassification(EnumAdaptor.valueOf(this.pk.getAlarmCls(), AlarmClassification.class))
				.displaySId(this.pk.getDispSid())
				.displayAtr(EnumAdaptor.valueOf(this.pk.getDispAtr(), DisplayAtr.class))
				.isResolved(this.resolved == 1)
				.occurrenceDateTime(this.crtDatetime)
				.displayMessage(new DisplayMessage(this.messege))
				.linkUrl(Optional.ofNullable(this.linkUrl).map(LinkURL::new))
				.readDateTime(Optional.ofNullable(this.readDateTime))
				.patternCode(Optional.ofNullable(new AlarmListPatternCode(this.patternCode)))
				.notificationId(Optional.ofNullable(new NotificationId(this.notificationId)))
				.subSids(this.subSidsToListString())
				.build();
	}
	
	public static SptdtToppageAlarm toEntity(ToppageAlarmData domain, int indexNo) {
		return SptdtToppageAlarm.builder()
				.pk(SptdtToppageAlarmPK.builder()
						.cId(domain.getCid())
						.alarmCls(domain.getAlarmClassification().value)
						.dispSid(domain.getDisplaySId())
						.dispAtr(domain.getDisplayAtr().value)
						.indexNo(indexNo)
						.build())
				.contractCd(AppContexts.user().contractCode())
				.patternCode(domain.getPatternCode().map(AlarmListPatternCode::v).orElse(null))
				.notificationId(domain.getNotificationId().map(NotificationId::v).orElse(null))
				.crtDatetime(domain.getOccurrenceDateTime())
				.messege(domain.getDisplayMessage().v())
				.linkUrl(domain.getLinkUrl().map(LinkURL::v).orElse(null))
				.readDateTime(domain.getReadDateTime().orElse(null))
				.resolved(domain.getIsResolved() ? 1 : 0)
				.subSids(subSidsToEntity(domain.getCid(), domain.getDisplaySId(), domain.getSubSids(),
						domain.getPatternCode().map(AlarmListPatternCode::v).orElse(null)))
				.build();
	}
	
	public static List<SptdtTopAlarmSubSya> subSidsToEntity(String cid, String dispSid, List<String> subSids, String patternCode) {
		return subSids.stream().map(sid -> {
			SptdtTopAlarmSubSya entity = new SptdtTopAlarmSubSya();
			entity.toEntity(cid, dispSid, sid, patternCode);
			return entity;
		}).collect(Collectors.toList());
	}
	
	public List<String> subSidsToListString() {
		return this.subSids.stream()
				.map(item -> item.getPk().getSubSid())
				.collect(Collectors.toList());
	}
}
