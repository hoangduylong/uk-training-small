package nts.uk.ctx.sys.portal.dom.toppagesetting;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.time.GeneralDate;

@Getter
@AllArgsConstructor
public class JobPosition {
	/** ID */
	private String id;
	/** 社員ID */
	private String sId;
	/** 職位ID */
	private String jobId;
	/** 開始日 */
	private GeneralDate startDate;
	/** 終了日 */
	private GeneralDate endDate;

	public static JobPosition createSimpleFromJavaType(String id, String sId, String jobId, GeneralDate startDate, GeneralDate endDate){
		return new JobPosition(id,sId,jobId, startDate,endDate);
	}
}
