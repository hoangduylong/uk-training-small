package nts.uk.shr.com.security.audittrail.correction.processor.pereg;

import java.util.List;

import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;

public interface PeregCorrectionLogWriter {

	void save(List<PersonInfoCorrectionLog> correctionLogs);
}
