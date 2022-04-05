package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Value;
import nts.uk.ctx.sys.portal.dom.toppagesetting.JobPosition;
@Value
public class JobPositionDto {
	/** ID */
	private String id;
	/** 社員ID */
	private String sId;
	/** 職位ID */
	private String jobId;
	/** 開始日 */
	private String startDate;
	/** 終了日 */
	private String endDate;
	
	public static JobPositionDto fromDomain(JobPosition jobPosition){
		return new JobPositionDto(jobPosition.getId(),jobPosition.getSId(),
				jobPosition.getJobId(),jobPosition.getStartDate().toString(),jobPosition.getEndDate().toString());
	}
}
