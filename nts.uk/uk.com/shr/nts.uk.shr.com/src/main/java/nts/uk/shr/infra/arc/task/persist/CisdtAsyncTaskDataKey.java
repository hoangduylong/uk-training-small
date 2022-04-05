package nts.uk.shr.infra.arc.task.persist;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CisdtAsyncTaskDataKey {
	

	@Column(name = "TASK_ID")
	public String taskId;
	
	@Column(name = "DATA_KEY")
	public String dataKey;

	
	
}
