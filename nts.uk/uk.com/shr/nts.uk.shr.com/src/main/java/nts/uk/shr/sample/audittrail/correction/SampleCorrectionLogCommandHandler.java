package nts.uk.shr.sample.audittrail.correction;

import java.util.ArrayList;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.shr.com.security.audittrail.correction.DataCorrectionContext;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionProcessorId;

@Stateless
public class SampleCorrectionLogCommandHandler extends CommandHandler<SampleCorrectionLogCommand> {
	
	@Override
	protected void handle(CommandHandlerContext<SampleCorrectionLogCommand> context) {
		
		DataCorrectionContext.transactional(CorrectionProcessorId.SAMPLE, () -> {
			val correctionLogParameter = new SampleCorrectionLogParameter(new ArrayList<>());
			DataCorrectionContext.setParameter(correctionLogParameter);
		});
	}

}
