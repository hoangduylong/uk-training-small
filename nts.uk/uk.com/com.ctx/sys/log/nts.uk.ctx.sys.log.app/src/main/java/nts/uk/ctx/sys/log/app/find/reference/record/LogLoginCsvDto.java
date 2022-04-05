package nts.uk.ctx.sys.log.app.find.reference.record;

import lombok.AllArgsConstructor;
import lombok.Data;

/*
 * author: thuongtv
 */

@Data
@AllArgsConstructor
public class LogLoginCsvDto {

	public LogLoginCsvDto() {
		super();
	}

	/* Login Emp Code */
	private String loginEmpCode;
	
	/* Login Emp Name */
	private String loginEmpName;
	
	/* Remarks */
	private String remarks;
	
	/* LoginTime */
	private String loginTime;
	
	/* Method */
	private int method;
	
	/* Status */
	private int status;
	
//	public static LogBasicInfoDto fromDomain(LogBasicInfo domain) {
//		return new LogBasicInfoDto();
//	}

}
