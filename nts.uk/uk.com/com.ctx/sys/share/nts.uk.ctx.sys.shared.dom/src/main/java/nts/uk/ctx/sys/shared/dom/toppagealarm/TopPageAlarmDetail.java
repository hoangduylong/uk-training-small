package nts.uk.ctx.sys.shared.dom.toppagealarm;

import lombok.Getter;

/**
 * トップページアラーム詳細
 * @author yennth
 *
 */
@Getter
public class TopPageAlarmDetail {
	/** 実行ログID */
	private String executionLogId;
	/** 連番 */
	private SerialNo serialNo;
	/** エラーメッセージ */
	private ErrorMessage errorMessage ;
	/** 対象社員ID */
	private String targerEmployee ;
	
	
	public static TopPageAlarmDetail createFromJavaType(String executionLogId, int serialNo, String errorMessage,
			String targerEmployee){
		return new TopPageAlarmDetail(executionLogId, new SerialNo(serialNo),
										new ErrorMessage(errorMessage), targerEmployee);
	}


	public TopPageAlarmDetail(String executionLogId, SerialNo serialNo, ErrorMessage errorMessage,
			String targerEmployee) {
		super();
		this.executionLogId = executionLogId;
		this.serialNo = serialNo;
		this.errorMessage = errorMessage;
		this.targerEmployee = targerEmployee;
	}
}
