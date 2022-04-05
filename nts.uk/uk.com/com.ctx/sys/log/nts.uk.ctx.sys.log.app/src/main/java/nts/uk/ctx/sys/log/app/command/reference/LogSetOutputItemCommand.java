package nts.uk.ctx.sys.log.app.command.reference;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.log.dom.reference.LogSetOutputItem;

@Setter
@Getter
public class LogSetOutputItemCommand {
	// 項目NO
	/** The Item NO. */
	private int itemNo;

	// 表示順
	/** The Display Order*/
	private int displayOrder;
	
	// 囲い文字
	/** The use flag. */
	private int isUseFlag;
	
	/** The log setting item detail */
	private List<LogSetItemDetailCommand> logSetItemDetails;
	
	public LogSetOutputItem toDomain(String logSetId, String cid) {
		boolean isUseFlag = this.isUseFlag == 1 ? true : false;
		return new LogSetOutputItem(logSetId, itemNo, displayOrder
				, isUseFlag, logSetItemDetails.stream().map(item -> item.toDomain(logSetId,cid)).collect(Collectors.toList()));			
	}
}
