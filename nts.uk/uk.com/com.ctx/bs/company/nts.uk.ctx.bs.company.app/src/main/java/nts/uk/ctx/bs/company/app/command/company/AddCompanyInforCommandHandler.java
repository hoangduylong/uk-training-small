package nts.uk.ctx.bs.company.app.command.company;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.company.dom.company.Company;
import nts.uk.ctx.bs.company.dom.company.CompanyRepository;
import nts.uk.shr.com.context.AppContexts;
/**
 * add company command handler
 * @author yennth
 *
 */
@Stateless
public class AddCompanyInforCommandHandler extends CommandHandler<AddCompanyInforCommand>{
	@Inject
	private CompanyRepository comRep;

	/**
	 * add company
	 */
	@Override
	protected void handle(CommandHandlerContext<AddCompanyInforCommand> context) {
		AddCompanyInforCommand data = context.getCommand();
		String contractCd = AppContexts.user().contractCode();
		Optional<Company> com = comRep.find(Company.createCompanyId(data.getCcd(), contractCd));
		// company existed
		if(com.isPresent()){
			throw new BusinessException("Msg_3");
		}
		Company company =  data.toDomain(contractCd);
		company.validate();
		comRep.insertCom(company);
	}
	
}
