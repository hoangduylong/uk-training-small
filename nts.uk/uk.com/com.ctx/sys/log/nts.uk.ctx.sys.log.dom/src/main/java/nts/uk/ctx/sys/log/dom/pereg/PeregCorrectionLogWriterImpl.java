package nts.uk.ctx.sys.log.dom.pereg;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogWriter;

@Stateless
public class PeregCorrectionLogWriterImpl implements PeregCorrectionLogWriter {

	@Inject
	IPersonInfoCorrectionLogRepository peregCorrectionLog;

	@Override
	public void save(List<PersonInfoCorrectionLog> correctionLogs) {
		peregCorrectionLog.save(correctionLogs);
	}
}
