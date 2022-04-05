package nts.uk.ctx.sys.log.dom.reference;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/*
 * author: hiep.th
 */

@Getter
@Setter
@AllArgsConstructor
/**
 * ログ出力項目
 */
public class LogSetOutputItem {
	
	// ID
	/** The log setting Id */
	private String logSetId;

	// 項目NO
	/** The Item NO. */
	private int itemNo;

	// 表示順
	/** The Display Order*/
	private int displayOrder;
	
	// 囲い文字
	/** The use flag. */
	private boolean isUseFlag;
	
	/* Optional List LogSetItemDetail /
	/** The list of log setting output item detail. */
	private List<LogSetItemDetail> logSetItemDetails;
	
	public static LogSetOutputItem createFromJavatype(String logSetId, 
			int itemNo, int displayOrder, boolean isUseFlag, List<LogSetItemDetail> logSetItemDetails) {
		return new LogSetOutputItem(logSetId, itemNo, displayOrder, isUseFlag, logSetItemDetails);
	}
}
