package nts.uk.ctx.sys.log.app.find.reference.record;

import lombok.Getter;
import lombok.Value;


@Value
public class ItemInfoDto {
	
	/** 項目ID */
	@Getter
	private  String id;
	
	@Getter
	private  String itemId;
	
	/** 項目名 */
	@Getter
	private  String name;
	
	/** 修正前 */
	@Getter
	private String valueBefore;
	
	/** 修正後 */
	@Getter
	private String valueAfter;
	
	/** number order */
	private int numberOrder;

}
