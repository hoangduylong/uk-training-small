package nts.uk.ctx.bs.company.app.command.company;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.company.dom.company.Company;
import nts.uk.ctx.bs.company.dom.company.CompanyRepository;
import nts.uk.shr.com.context.AppContexts;
/**
 * delete a company infor item
 * @author yennth
 */
@Stateless
public class DeleteCompanyInforCommandHandler extends CommandHandler<DeleteCompanyInforCommand>{
	@Inject
	private CompanyRepository comRep;

	/**
	 * delete company
	 */
	@Override
	protected void handle(CommandHandlerContext<DeleteCompanyInforCommand> context) {
		DeleteCompanyInforCommand data = context.getCommand();
		String contractCd = AppContexts.user().contractCode();
		Optional<Company> com = comRep.find(data.getCompanyId());
		if(!com.isPresent()){
			throw new RuntimeException("対象データがありません。");
		}
		comRep.deleteCom(data.getCompanyId(), contractCd, data.getCompanyCode());
	}
	
}
