package nts.uk.shr.sample.audittrail.correction;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.security.audittrail.correction.content.CorrectionAttr;
import nts.uk.shr.com.security.audittrail.correction.content.DataCorrection;
import nts.uk.shr.com.security.audittrail.correction.content.ItemInfo;
import nts.uk.shr.com.security.audittrail.correction.content.TargetDataKey;
import nts.uk.shr.com.security.audittrail.correction.content.TargetDataType;
import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;

@RequiredArgsConstructor
public class SampleCorrection implements DataCorrection {
	
	@Getter
	private final UserInfo targetUser;
	
	private final GeneralDate targetDate;
	
	@Getter
	private final CorrectionAttr correctionAttr;
	
	@Getter
	private final ItemInfo correctedItem;
	
	@Getter
	private final int showOrder;

	@Override
	public TargetDataType getTargetDataType() {
		return TargetDataType.DAILY_RECORD;
	}

	@Override
	public TargetDataKey getTargetDataKey() {
		return TargetDataKey.of(this.targetDate);
	}
}
