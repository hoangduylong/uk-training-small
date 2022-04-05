package nts.uk.shr.sample.pereg.command;

import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionProcessorId;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogProcessor;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogProcessorContext;

//@Stateless
public class SamplePeregCorrectionLogProcessor extends PeregCorrectionLogProcessor {

	@Override
	public CorrectionProcessorId getId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected void buildLogContents(PeregCorrectionLogProcessorContext context) {
		
		// SampleParam param = context.getParameter("sample");
		
//		PersonInfoCorrectionLog log = new PersonInfoCorrectionLog(
//				context.getOperationId(),
//				processAttr  // use parameter from command handler,
//				targetUser   // use this.userInfoAdaptor,
//				categoryCorrections);
//		
//		context.addCorrection(log);
	}

}
