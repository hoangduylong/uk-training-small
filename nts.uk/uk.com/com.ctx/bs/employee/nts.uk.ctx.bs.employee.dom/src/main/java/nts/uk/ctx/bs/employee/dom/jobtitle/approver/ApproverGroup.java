package nts.uk.ctx.bs.employee.dom.jobtitle.approver;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode;

/**
 * 承認者グループ
 * @author Doan Duy Hung
 *
 */
@Getter
@AllArgsConstructor
public class ApproverGroup extends AggregateRoot {
	
	/**
	 * 会社ID
	 */
	private String companyID;
	
	/**
	 * 承認者Gコード
	 */
	private JobTitleCode approverGroupCD;
	
	/**
	 * 承認者G名称
	 */
	private ApproverName approverGroupName;
	
	/**
	 * 職位情報
	 */
	private List<ApproverJob> approverJobList;
}
