package nts.uk.shr.com.security.audittrail.correction.processor;

import javax.inject.Inject;

import lombok.val;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;

/**
 * The base class to log audit trail of corrections.
 */

public abstract class DataCorrectionLogProcessor extends CorrectionLogProcessor<CorrectionLogProcessorContext> {
	
	@Inject
	private LogBasicInformationWriter basicInfoRepository;
	
	@Inject
	private DataCorrectionLogWriter correctionLogRepository;
	
	@Override
	public void processLoggingForBus(LogBasicInformation basicInfo, Object parameter) {
		val context = CorrectionLogProcessorContext.newContext(basicInfo, parameter);
		this.buildLogContents(context);

		this.basicInfoRepository.save(basicInfo);
		this.correctionLogRepository.save(context.getCorrections());
	}
}
