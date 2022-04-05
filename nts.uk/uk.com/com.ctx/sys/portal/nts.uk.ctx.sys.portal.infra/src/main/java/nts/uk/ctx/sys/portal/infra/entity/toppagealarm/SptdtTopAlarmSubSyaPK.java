package nts.uk.ctx.sys.portal.infra.entity.toppagealarm;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode
@Embeddable
public class SptdtTopAlarmSubSyaPK implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/*
	 * 会社ID
	 */
	@NonNull
	@Column(name = "CID")
	private String cId;
	
	/**
	 * 表示社員ID
	 */
	@NonNull
	@Column(name = "DISP_SID")
	private String dispSid;
	
	/**
	 * 部下の社員ID
	 */
	@NonNull
	@Column(name = "SUB_SID")
	private String subSid;
	
	/**
	 * パターンコード
	 */
	@Column(name = "ALARM_PATTERN_CD")
	private String patternCode;
	
}
