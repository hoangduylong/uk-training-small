package nts.uk.ctx.sys.portal.app.find.toppagepart;

import lombok.Value;

/**
 * @author LamDT
 */
@Value
public class TopPagePartDto {

	/** Company ID */
	private String companyID;

	/** TopPage Part GUID */
	private String topPagePartID;

	/** Code */
	private String code;

	/** Name */
	private String name;

	/** TopPage Part Type */
	private int type;
	
	/** Width */
	private int width;

	/** Height */
	private int height;

}