package nts.uk.ctx.sys.portal.dom.notice.adapter;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * Class DatePeriodDto
 */
@Data
@Builder
public class DatePeriodDto {
	
	/** The start date. */
	private GeneralDate startDate;

	/** The end date. */
	private GeneralDate endDate;
}
