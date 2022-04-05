package nts.uk.ctx.bs.employee.app.command.employee.history;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistService;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyInfoRepository;
import nts.uk.shr.pereg.app.command.PeregDeleteCommandHandler;

@Stateless
public class DeleteAffCompanyHistoryCommandHandler extends CommandHandler<DeleteAffCompanyHistoryCommand>
	implements PeregDeleteCommandHandler<DeleteAffCompanyHistoryCommand>{
	@Inject
	private AffCompanyHistRepository affCompanyHistRepository;
	
	@Inject
	private AffCompanyInfoRepository affCompanyInfoRepository;
	
	@Inject
	private AffCompanyHistService affCompanyHistService;
	
	@Override
	public String targetCategoryCd() {
		return "CS00003";
	}

	@Override
	public Class<?> commandClass() {
		return DeleteAffCompanyHistoryCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<DeleteAffCompanyHistoryCommand> context) {
		val command = context.getCommand();
		
		AffCompanyHist listHist = affCompanyHistRepository.getAffCompanyHistoryOfEmployee(command.getSId());
		if (listHist == null){
			throw new RuntimeException("Invalid AffCompanyHist");
		}
		 AffCompanyHistByEmployee listHistBySID = listHist.getAffCompanyHistByEmployee(command.getSId());
		
		Optional<AffCompanyHistItem> itemToBeDeleted = listHistBySID.getLstAffCompanyHistoryItem().stream()
				.filter(h->h.identifier().equals(command.getHistoryId())).findFirst();
		
		if (!itemToBeDeleted.isPresent()){
			throw new RuntimeException("Invalid AffCompanyHist");
		}
		
		listHistBySID.remove(itemToBeDeleted.get());
		affCompanyHistService.delete(listHistBySID, itemToBeDeleted.get(), command.getPId());
		
		affCompanyInfoRepository.remove(command.getHistoryId());
		
	}

}
