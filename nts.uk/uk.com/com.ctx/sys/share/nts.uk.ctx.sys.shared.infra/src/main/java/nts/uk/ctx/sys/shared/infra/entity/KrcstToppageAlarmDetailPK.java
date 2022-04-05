package nts.uk.ctx.sys.shared.infra.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class KrcstToppageAlarmDetailPK implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 実行ログID */
	@Column(name = "EXECUTION_LOG_ID")
	public String executionLogId;
	
	/** 連番 */
	@Column(name = "SERIAL_NO")
	public int serialNo;
}
