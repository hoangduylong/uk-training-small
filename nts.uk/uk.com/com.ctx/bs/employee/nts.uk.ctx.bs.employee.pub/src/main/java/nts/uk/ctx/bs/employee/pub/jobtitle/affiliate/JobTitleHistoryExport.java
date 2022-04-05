package nts.uk.ctx.bs.employee.pub.jobtitle.affiliate;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class JobTitleHistoryExport {

	private List<AffJobTitleHistoryExport> histories;

	private List<AffJobTitleHistoryItemExport> historyItems;

}
