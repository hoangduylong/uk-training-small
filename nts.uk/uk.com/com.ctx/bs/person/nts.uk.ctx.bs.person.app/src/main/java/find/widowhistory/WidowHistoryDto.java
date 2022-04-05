/**
 * 
 */
package find.widowhistory;

import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

/**
 * @author danpv
 *
 */
public class WidowHistoryDto extends PeregDomainDto {

	/** 寡夫寡婦ID */
	@PeregItem("")
	private String widowHistoryId;

	/** 寡夫寡婦区分 */
	@PeregItem("")
	private int widowType;

	/** 期間の開始日 */
	@PeregItem("")
	private GeneralDate startDate;
	
	/** 期間の終了日*/
	@PeregItem("")
	private GeneralDate endDate;

}
