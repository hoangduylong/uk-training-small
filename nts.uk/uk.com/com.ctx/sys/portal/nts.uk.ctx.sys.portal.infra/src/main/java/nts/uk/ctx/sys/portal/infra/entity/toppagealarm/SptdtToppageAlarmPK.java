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
public class SptdtToppageAlarmPK implements Serializable {
	private static final long serialVersionUID = 1L;

	/*
	 * 会社ID
	 */
	@NonNull
	@Column(name = "CID")
	private String cId;

	/**
	 * アラーム分類
	 */
	@NonNull
	@Column(name = "ALARM_CLS")
	private Integer alarmCls;

	/**
	 * 表示社員ID
	 */
	@NonNull
	@Column(name = "DISP_SID")
	private String dispSid;

	/**
	 * 表示社員区分
	 */
	@NonNull
	@Column(name = "DISP_ATR")
	private Integer dispAtr;

	/*
	 * 登録用の番号（一意を保証）
	 */
	@NonNull
	@Column(name = "INDEX_NO")
	private Integer indexNo;
	
}
