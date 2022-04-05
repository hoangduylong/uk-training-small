package nts.uk.ctx.sys.log.app.find.datacorrectionlog;

import lombok.Value;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;

/**
 * 
 * @author HungTT
 *
 */

@Value
public class DataCorrectionLogDto {

	private GeneralDate targetDate;
	private String targetUser;
	private String item;
	private String valueBefore;
	private String valueAfter;
	private String modifiedPerson;
	private GeneralDateTime modifiedDateTime;
	private int correctionAttr;
	private String employeeCode;
	private int displayOrder;
	
}
