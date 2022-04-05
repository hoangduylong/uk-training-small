/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.temporaryabsence.frame;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.NotUseAtr;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrame;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceRepositoryFrame;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class RegisterTempAbsenceFrameCommandHandler.
 */
@Stateless
@Transactional
public class RegisterTempAbsenceFrameCommandHandler extends CommandHandler<RegisterTempAbsenceFrameCommand>{

	/** The temp absence frame repository. */
	@Inject
	private TempAbsenceRepositoryFrame tempAbsenceFrameRepository;
	
	@Override
	protected void handle(CommandHandlerContext<RegisterTempAbsenceFrameCommand> context) {
		RegisterTempAbsenceFrameCommand command = context.getCommand();
		
		//get company id
		String companyId = AppContexts.user().companyId();
		
		// convert to domain
		List<TempAbsenceFrame> absenceFrame = command.toDomain();
		
		// update
		for (TempAbsenceFrame tempAbsenceFrameClient: absenceFrame) {
			TempAbsenceFrame tempFromDB = tempAbsenceFrameRepository.findByTempAbsenceFramePk( companyId, 
																				tempAbsenceFrameClient.getTempAbsenceFrNo().v().intValue());
			/* 
			 * 	update object get from DB when == 0 or object get from Client when == 1\
			 */
			if (tempAbsenceFrameClient.getUseClassification().value == 0) {
				tempFromDB.setUseClassification(NotUseAtr.NOT_USE);
				tempAbsenceFrameRepository.udpate(tempFromDB);
			} else {
				tempAbsenceFrameRepository.udpate(tempAbsenceFrameClient);
			}	
		}
	}
}
