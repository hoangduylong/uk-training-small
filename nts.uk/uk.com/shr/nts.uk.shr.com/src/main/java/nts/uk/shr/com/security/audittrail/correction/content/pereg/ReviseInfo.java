package nts.uk.shr.com.security.audittrail.correction.content.pereg;

import java.util.Optional;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.arc.time.YearMonth;

/**
 * 補正情報
 */
@RequiredArgsConstructor
@Getter
public class ReviseInfo {

	/** 項目名 */
	private final String itemName;
	
	/** 年月日 */
	private final Optional<GeneralDate> date;
	
	/** 年月 */
	private final Optional<YearMonth> yearMonth;
	
	/** 年 */
	private final Optional<Integer> year;
}
