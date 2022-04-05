package nts.uk.ctx.sys.log.app.command.reference;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.log.dom.reference.LogCondition;
import nts.uk.ctx.sys.log.dom.reference.LogSetItemDetail;
import nts.uk.ctx.sys.log.dom.reference.SymbolEnum;

@Setter
@Getter
public class LogSetItemDetailCommand {
	/** The Item No*/
	private int itemNo;
	
	// 枠
	/** The Frame */
	private int frame;
	
	// 条件
	/** The Log Condition */
	private String condition;
	
	// 記号
	/** The Symbol Condition */
	private int sybol;
	
	/**
	 * 契約コード
	 */
	private String contractCd;
	
	/**
	 * 会社ID
	 */
	private String cid;
	
	public LogSetItemDetail toDomain(String logSetId, String cid) {
		return new LogSetItemDetail(logSetId, itemNo, frame, 
				new LogCondition(condition), SymbolEnum.valueOf(sybol), cid);			
	}
}
