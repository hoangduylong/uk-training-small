package nts.uk.ctx.sys.portal.app.command.toppagealarm;

import lombok.Data;

@Data
public class ToppageAlarmDataReadCommand {

	//会社ID
	private String companyId;
	
	//表示社員ID
	private String sid;
	
	//表示社員区分
	private Integer displayAtr;
	
	//アラーム分類
	private Integer alarmClassification;
	
	//パターンコード
	private String patternCode;
	
	//通知ID
	private String notificationId;
}
