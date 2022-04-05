package nts.uk.shr.infra.arc.task.persist;

import java.io.Serializable;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@Table(name="CISDT_ASYNC_TASK_ABORT")
@Cacheable(false)
public class CisdtAsyncTaskAbort  extends ContractUkJpaEntity implements Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "TASK_ID")
	public String taskId;

	@Column(name = "ERROR_TYPE")
	public int errorType;

	@Column(name = "MESSAGE_ID")
	public String messageId;
	
	@Column(name = "ERROR_MESSAGE")
	public String errorMessage;

	@Override
	protected Object getKey() {
		return taskId;
	}
	
}
