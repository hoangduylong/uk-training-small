package nts.uk.ctx.sys.shared.app.toppagealarm.find;

import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDateTime;

/**
 * top page alarm dto
 * 
 * @author yennth
 *
 */
@Getter
@NoArgsConstructor
public class TopPageAlarmDto {
	/** 実行ログID */
	private String executionLogId;
	/** 実行完了日時 */
	private GeneralDateTime finishDateTime;
	/** 実行内容 AlarmCategory */
	private int executionContent;
	/** エラーの有無 */
	private boolean existenceError;
	/** 了解フラグ */
	private boolean rogerFlag;
	/** 処理名 */
	private String processingName;
	/** 処理結果 */
	private String processingResult;

	public TopPageAlarmDto(String executionLogId, GeneralDateTime finishDateTime, int executionContent,
			boolean existenceError, boolean rogerFlag, String processingName, String processingResult) {
		super();
		this.executionLogId = executionLogId;
		this.finishDateTime = finishDateTime;
		this.executionContent = executionContent;
		this.existenceError = existenceError;
		this.rogerFlag = rogerFlag;
		this.processingName = processingName;
		this.processingResult = processingResult;
	}
}
