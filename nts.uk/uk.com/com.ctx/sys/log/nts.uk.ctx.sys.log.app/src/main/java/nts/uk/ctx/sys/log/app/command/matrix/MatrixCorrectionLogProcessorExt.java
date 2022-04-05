package nts.uk.ctx.sys.log.app.command.matrix;

import java.util.Arrays;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.gul.collection.CollectionUtil;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.CategoryCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionProcessorId;
import nts.uk.shr.com.security.audittrail.correction.processor.LogBasicInformationWriter;
import nts.uk.shr.com.security.audittrail.correction.processor.matrix.MatrixCorrectionLogProcessor;
import nts.uk.shr.com.security.audittrail.correction.processor.matrix.MatrixCorrectionLogProcessorContext;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogWriter;

@Stateless
public class MatrixCorrectionLogProcessorExt extends MatrixCorrectionLogProcessor{
	
	@Inject
	protected LogBasicInformationWriter basicInfoRepository;
	
	@Inject
	protected PeregCorrectionLogWriter correctionLogRepository;
	
	@Override
	public CorrectionProcessorId getId() {
		return CorrectionProcessorId.MATRIX_REGISTER;
	}
	
	@Override
	public void processLoggingForBus(LogBasicInformation basicInfo, Object parameter) {

		val context = MatrixCorrectionLogProcessorContext.newContext(basicInfo.getOperationId(), parameter);
		
		this.buildLogContents(context);
		
		if (!CollectionUtil.isEmpty(context.getCorrections())) {
			this.basicInfoRepository.save(basicInfo);
			this.correctionLogRepository.save(context.getCorrections());
		}
		
	}

	@Override
	protected void buildLogContents(MatrixCorrectionLogProcessorContext context) {
		MatrixPersonCorrectionLogParams params = context.getParameter();
		params.getMatrixLog().forEach(c ->{
			CategoryCorrectionLog ctgLog = c.getCategory().toCategoryInfo();
			PersonInfoCorrectionLog perLog =  c.getPerson().toPersonInfoCorrection(context.getOperationId(), c.getPerson().remark , Arrays.asList(ctgLog));
			context.addCorrection(perLog);
		});
	}

}
