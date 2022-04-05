package nts.uk.ctx.sys.shared.infra.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * 
 * @author yennth
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SSHDT_TOPPAGEALARM")
public class SshdtToppagealarm extends ContractUkJpaEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** 実行ログID */
	@Id
	@Column(name = "EXECUTION_LOG_ID")
	public String executionLogId;
	
	/** 会社ID */
	@Column(name = "CID")
	public String companyId;
	/** 管理社員ID */
	@Column(name = "MANAGER_ID")
	public String managerId;
	/** 実行完了日時 */
	@Column(name = "FINISH_DATE_TIME")
	public GeneralDateTime finishDateTime;
	/** 実行内容 */
	@Column(name = "EXECUTION_CONTENT")
	public int executionContent;
	/** エラーの有無 */
	@Column(name = "EXISTENCE_ERROR")
	public int existenceError;
	/** 了解フラグ */
	@Setter
	@Column(name = "ROGER_FLAG")
	public int rogerFlag;
	/** 中止フラグ */
	@Setter
	@Column(name = "IS_CANCELLED")
	public int isCancelled;
	@Override
	protected Object getKey() {
		return this.executionLogId;
	}
}
