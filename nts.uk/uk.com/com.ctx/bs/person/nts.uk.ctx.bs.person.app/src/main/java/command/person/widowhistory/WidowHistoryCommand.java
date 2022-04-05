package command.person.widowhistory;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;
@Getter
public class WidowHistoryCommand {

	
	/** 寡夫寡婦ID */
	@PeregRecordId
	private String widowHistoryId;
	
	/** 寡夫寡婦区分 */
	@PeregItem("")
	private int widowType;

	@PeregItem("")
	private GeneralDate startDate;

	@PeregItem("")
	private GeneralDate endDate;
	

}
