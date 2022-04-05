package nts.uk.shr.com.security.audittrail;

import java.io.Serializable;
import java.util.HashMap;

import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionProcessorId;

public interface AuditTrailTransaction {

	void begin(LogBasicInformation basicInfo, CorrectionProcessorId processorId, HashMap<String, Serializable> parameters);
}
