package nts.uk.shr.com.security.audittrail.correction.processor.matrix;

import javax.inject.Inject;

import lombok.val;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionLogProcessor;
import nts.uk.shr.com.security.audittrail.correction.processor.LogBasicInformationWriter;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogWriter;

public abstract class MatrixCorrectionLogProcessor extends CorrectionLogProcessor<MatrixCorrectionLogProcessorContext>{
	
	@Inject
	protected LogBasicInformationWriter basicInfoRepository;
	
	@Inject
	protected PeregCorrectionLogWriter correctionLogRepository;
	
	@Override
	public void processLoggingForBus(LogBasicInformation basicInfo, Object parameter) {
		val context = MatrixCorrectionLogProcessorContext.newContext(basicInfo.getOperationId(), parameter);
		this.buildLogContents(context);

		this.basicInfoRepository.save(basicInfo);
		this.correctionLogRepository.save(context.getCorrections());
	}
}
