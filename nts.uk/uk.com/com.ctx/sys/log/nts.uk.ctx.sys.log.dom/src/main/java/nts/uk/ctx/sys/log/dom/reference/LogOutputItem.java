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
 * ログ出力項目
 */
public class LogOutputItem {
	
	// 項目NO
	/** The Item NO. */
	private int itemNo;

	// 項目名
	/** The Item Name*/
	private LogOutputItemName itemName;
	
	// 記録種類
	/** The Record Type */
	private RecordTypeEnum recordType;
	
	
	public static LogOutputItem createFromJavatype(int itemNo, 
			String itemName, int recoreType) {
		return new LogOutputItem(itemNo, new LogOutputItemName(itemName), RecordTypeEnum.valueOf(recoreType));
	}
}
