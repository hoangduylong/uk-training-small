package nts.uk.ctx.sys.shared.app.toppagealarm.find;

import lombok.Getter;

/**
 * toppage alarm detail dto for Ktg031
 * @author yennth
 *
 */
@Getter
public class TopPageAlarmDetailDto {
	
	/** 社員コード */
	private String employeeCode;
	
	/** 連番 */
	private int serialNo;
	
	/** 社員名 */
	private String employeeName;
	
	/** エラーメッセージ */
	private String errorMessage ;
	
	/** 処理名 */
	private String processingName;

	public TopPageAlarmDetailDto(String employeeCode, int serialNo, String employeeName, String errorMessage,
			String processingName) {
		super();
		this.employeeCode = employeeCode;
		this.serialNo = serialNo;
		this.employeeName = employeeName;
		this.errorMessage = errorMessage;
		this.processingName = processingName;
	}
	
}
