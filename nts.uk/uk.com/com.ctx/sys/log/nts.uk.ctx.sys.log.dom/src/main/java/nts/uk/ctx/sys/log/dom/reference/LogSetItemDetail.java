package nts.uk.ctx.sys.log.dom.reference;

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
 * LogOutputItem.java
 */
public class LogSetItemDetail {
	
	// Id
	/** The Log Setting Id. */
	private String logSetId;

	// 項目NO
	/** The Item No*/
	private int itemNo;
	
	// 枠
	/** The Frame */
	private int frame;
	
	// 条件
	/** The Log Condition */
	private LogCondition condition;
	
	// 記号
	/** The Symbol Condition */
	private SymbolEnum symbol;
	
	/**
	 * 会社ID
	 */
	private String cid;
	
	public static LogSetItemDetail createFromJavatype(String logSetId, int itemNo, 
			int frame, String condition, int symbol, String cid) {
		return new LogSetItemDetail(logSetId, itemNo, frame, 
				new LogCondition(condition), SymbolEnum.valueOf(symbol), cid);
	}
}
