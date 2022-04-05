package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Value;
/**
 * 
 * @author hoatt
 *
 */
@Value
public class FlowMenuPlusDto {
	
	private String toppagePartID;

	private String topPageCode;
	
	private String topPageName;
				
	private int type;
	
	private int widthSize;
	
	private int heightSize;
	
	private String fileID;
	
	private String fileName;
	
	private int defClassAtr;
	/** Row */
	private int row;
	/** Column */
	private int column;
}
