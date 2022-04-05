package nts.uk.ctx.sys.portal.infra.entity.toppagealarm;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.PrimaryKeyJoinColumns;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * トップページアラームデータの部下の社員 Entity
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "SPTDT_TOP_ALARM_SUB_SYA")
public class SptdtTopAlarmSubSya extends ContractUkJpaEntity implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Version
	@Column(name = "EXCLUS_VER")
	private long version;
	
	@EmbeddedId
	private SptdtTopAlarmSubSyaPK pk;

	@ManyToOne
	@PrimaryKeyJoinColumns({ 
		@PrimaryKeyJoinColumn(name = "CID", referencedColumnName = "CID"),
		@PrimaryKeyJoinColumn(name = "DISP_SID", referencedColumnName = "DISP_SID"),
		@PrimaryKeyJoinColumn(name = "ALARM_PATTERN_CD", referencedColumnName = "ALARM_PATTERN_CD")
	})
	public SptdtToppageAlarm sptdtToppageAlarm;

	@Override
	protected Object getKey() {
		return this.pk;
	}
	
	public void toEntity(String cid, String dispSid, String subSid, String patternCode) {
		this.pk = new SptdtTopAlarmSubSyaPK();
		this.pk.setCId(cid);
		this.pk.setDispSid(dispSid);
		this.pk.setSubSid(subSid);
		this.pk.setPatternCode(patternCode);
	}
}
