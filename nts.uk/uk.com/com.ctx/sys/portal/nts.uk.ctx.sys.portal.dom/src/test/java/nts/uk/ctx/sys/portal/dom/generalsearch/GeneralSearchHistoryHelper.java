package nts.uk.ctx.sys.portal.dom.generalsearch;

import nts.arc.time.GeneralDateTime;

public class GeneralSearchHistoryHelper {
	public static GeneralSearchHistoryDto getMockDto() {
		return GeneralSearchHistoryDto.builder()
			.companyID("companyID")
			.contents("contents")
			.searchCategory(0)
			.searchDate(GeneralDateTime.now())
			.userID("userID")
			.build();
	}
}
