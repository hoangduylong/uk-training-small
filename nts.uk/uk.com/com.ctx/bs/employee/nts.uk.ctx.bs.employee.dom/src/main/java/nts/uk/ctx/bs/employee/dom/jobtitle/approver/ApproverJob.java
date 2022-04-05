package nts.uk.ctx.bs.employee.dom.jobtitle.approver;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 職位リスト
 * @author Doan Duy Hung
 *
 */
@Getter
@AllArgsConstructor
public class ApproverJob {
	
	/**
	 * 職位ID
	 */
	private String jobID;
	
	/**
	 * 並び順
	 */
	private int order;
	
}
