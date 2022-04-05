package nts.uk.shr.sample.pereg.command;

import java.util.ArrayList;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.shr.com.security.audittrail.correction.DataCorrectionContext;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;
import nts.uk.shr.sample.audittrail.correction.SampleCorrectionLogParameter;

@Stateless
public class SampleUpdatePersonBaseCommandHandler extends CommandHandler<SampleUpdatePersonBaseCommand>
		implements PeregUpdateCommandHandler<SampleUpdatePersonBaseCommand> {

	@Override
	protected void handle(CommandHandlerContext<SampleUpdatePersonBaseCommand> context) {
		
		//DataCorrectionContext.transactionBegun(processorId);
		
		val command = context.getCommand();
		String fullName = command.getFullName();
		fullName.toString();
		
		val correctionLogParameter = new SampleCorrectionLogParameter(new ArrayList<>());
		
		// ...
		
		DataCorrectionContext.setParameter("sample", correctionLogParameter);
		
		//DataCorrectionContext.transactionFinishing();
	}

	@Override
	public String targetCategoryCd() {
		return "CS00001";
	}

	@Override
	public Class<?> commandClass() {
		return SampleUpdatePersonBaseCommand.class;
	}

}
